const Product = require('../models/Product');
const Category = require('../models/Category');
const Shop = require('../models/Shop');
const { slugify } = require('../utils/slugify');
const cloudinaryService = require('../services/cloudinaryService');

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const {
      name, description, price, oldPrice, images, category,
      shop, brand, stock, available, featured, specifications,
      tags, metaTitle, metaDescription
    } = req.body;

    if (!name || !description || !price || !category || !images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Champs requis manquants (nom, description, prix, catégorie, images)'
      });
    }

    // Vérifier la catégorie
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ success: false, message: 'Catégorie invalide' });
    }

    // Vérifier la boutique si fournie
    if (shop) {
      const shopExists = await Shop.findById(shop);
      if (!shopExists) {
        return res.status(400).json({ success: false, message: 'Boutique invalide' });
      }
    }

    const slug = slugify(name);
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({ success: false, message: 'Un produit avec ce nom existe déjà' });
    }

    const product = await Product.create({
      name, slug, description,
      shortDescription: description.substring(0, 200),
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      images, category,
      shop: shop || null,
      brand: brand || '',
      stock: Number(stock) || 0,
      available: available === 'true' || available === true,
      featured: featured === 'true' || featured === true,
      specifications: specifications || {},
      tags: tags || [],
      metaTitle: metaTitle || name,
      metaDescription: metaDescription || description.substring(0, 160)
    });

    // Incrémenter le compteur de produits de la boutique
    if (shop) {
      await Shop.findByIdAndUpdate(shop, { $inc: { totalProducts: 1 } });
    }

    await Category.findByIdAndUpdate(category, { $inc: { productCount: 1 } });

    res.status(201).json({ success: true, product });

  } catch (error) {
    console.error('Create product error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: errors[0] });
    }
    res.status(500).json({ success: false, message: 'Erreur lors de la création: ' + error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      page = 1, limit = 20, search, category, shop, brand,
      minPrice, maxPrice, available, featured, sort = '-createdAt', tags
    } = req.query;

    const filter = {};

    if (search) filter.$text = { $search: search };
    if (category) filter.category = category;
    if (shop) filter.shop = shop; // ⭐ FILTRE PAR BOUTIQUE
    if (brand) filter.brand = { $regex: brand, $options: 'i' };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (available === 'true') {
      filter.available = true;
      filter.stock = { $gt: 0 };
    } else if (available === 'false') {
      filter.available = false;
    }

    if (featured === 'true') filter.featured = true;
    if (tags) filter.tags = { $in: tags.split(',') };

    const skip = (Number(page) - 1) * Number(limit);
    const limitNum = Math.min(Number(limit), 100);

    const sortOptions = {};
    if (sort === 'price') sortOptions.price = 1;
    else if (sort === '-price') sortOptions.price = -1;
    else if (sort === 'name') sortOptions.name = 1;
    else if (sort === '-views') sortOptions.views = -1;
    else sortOptions.createdAt = -1;

    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .populate('shop', 'name slug')
      .sort(sortOptions)
      .limit(limitNum)
      .skip(skip)
      .lean();

    const total = await Product.countDocuments(filter);
    const categories = await Category.find({ active: true }).select('name slug _id');
    const brands = await Product.distinct('brand', { brand: { $ne: '' } });

    res.json({
      success: true,
      products,
      pagination: { page: Number(page), limit: limitNum, total, pages: Math.ceil(total / limitNum) },
      filters: { categories, brands: brands.sort() }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors du chargement des produits' });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('shop', 'name slug whatsappNumber');

    if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });

    await Product.findByIdAndUpdate(product._id, { $inc: { views: 1 } });

    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
      available: true,
      stock: { $gt: 0 }
    }).limit(4).lean();

    res.json({ success: true, product, relatedProducts });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, message: 'Erreur' });
  }
};

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category', 'name slug')
      .populate('shop', 'name slug whatsappNumber');

    if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });

    await Product.findByIdAndUpdate(product._id, { $inc: { views: 1 } });

    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
      available: true,
      stock: { $gt: 0 }
    }).limit(4).lean();

    res.json({ success: true, product, relatedProducts });
  } catch (error) {
    console.error('Get product by slug error:', error);
    res.status(500).json({ success: false, message: 'Erreur' });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });

    const updates = { ...req.body };

    // Si la boutique change
    if (updates.shop && updates.shop !== product.shop?.toString()) {
      // Décrémenter l'ancienne boutique
      if (product.shop) {
        await Shop.findByIdAndUpdate(product.shop, { $inc: { totalProducts: -1 } });
      }
      // Incrémenter la nouvelle
      await Shop.findByIdAndUpdate(updates.shop, { $inc: { totalProducts: 1 } });
    }

    // Si le nom change, régénérer le slug
    if (updates.name && updates.name !== product.name) {
      updates.slug = slugify(updates.name);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, updates, { new: true, runValidators: true }
    ).populate('category', 'name slug').populate('shop', 'name slug');

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la modification' });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });

    if (product.images && product.images.length > 0) {
      await cloudinaryService.deleteImages(product.images);
    }

    if (product.shop) {
      await Shop.findByIdAndUpdate(product.shop, { $inc: { totalProducts: -1 } });
    }

    await Category.findByIdAndUpdate(product.category, { $inc: { productCount: -1 } });
    await product.deleteOne();

    res.json({ success: true, message: 'Produit supprimé' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression' });
  }
};

// @desc    Toggle product availability
// @route   PATCH /api/products/:id/toggle
// @access  Private
const toggleProductAvailability = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });

    product.available = !product.available;
    await product.save();

    res.json({ success: true, available: product.available });
  } catch (error) {
    console.error('Toggle error:', error);
    res.status(500).json({ success: false, message: 'Erreur' });
  }
};

// @desc    Get featured products
const getFeaturedProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 8;
    const products = await Product.find({ featured: true, available: true, stock: { $gt: 0 } })
      .sort({ views: -1 }).limit(limit).populate('category', 'name slug').populate('shop', 'name slug');
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur' });
  }
};

// @desc    Get new arrivals
const getNewArrivals = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 8;
    const products = await Product.find({ available: true, stock: { $gt: 0 } })
      .sort({ createdAt: -1 }).limit(limit).populate('category', 'name slug').populate('shop', 'name slug');
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur' });
  }
};

module.exports = {
  createProduct, getProducts, getProductById, getProductBySlug,
  updateProduct, deleteProduct, toggleProductAvailability,
  getFeaturedProducts, getNewArrivals
};
