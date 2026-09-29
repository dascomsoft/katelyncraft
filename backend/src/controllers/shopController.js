const Shop = require('../models/Shop');
const Sector = require('../models/Sector');
const Product = require('../models/Product');
const { slugify } = require('../utils/slugify');

// @desc    Get all shops
// @route   GET /api/shops
// @access  Public
const getShops = async (req, res) => {
  try {
    const { sector, featured, search } = req.query;
    const filter = { status: 'active' };

    if (sector) filter.sector = sector;
    if (featured === 'true') filter.featured = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const shops = await Shop.find(filter)
      .populate('sector', 'name slug icon color')
      .sort({ featured: -1, createdAt: -1 });

    res.json({ success: true, shops });
  } catch (error) {
    console.error('Get shops error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du chargement des boutiques'
    });
  }
};

// @desc    Get shop by slug
// @route   GET /api/shops/:slug
// @access  Public
const getShopBySlug = async (req, res) => {
  try {
    const shop = await Shop.findOne({ slug: req.params.slug })
      .populate('sector', 'name slug icon color');

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Boutique non trouvée'
      });
    }

    const products = await Product.find({ 
      shop: shop._id, 
      available: true 
    }).populate('category', 'name slug').limit(50);

    res.json({
      success: true,
      shop,
      products
    });
  } catch (error) {
    console.error('Get shop error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du chargement de la boutique'
    });
  }
};

// @desc    Create shop
// @route   POST /api/shops
// @access  Private
const createShop = async (req, res) => {
  try {
    const {
      name, sector, description, logo, coverImage,
      ownerName, ownerPhone, whatsappNumber, email, address,
      featured, subscription
    } = req.body;

    if (!name || !sector || !ownerName || !ownerPhone || !whatsappNumber) {
      return res.status(400).json({
        success: false,
        message: 'Champs requis manquants'
      });
    }

    const sectorExists = await Sector.findById(sector);
    if (!sectorExists) {
      return res.status(400).json({
        success: false,
        message: 'Secteur invalide'
      });
    }

    const slug = slugify(name);
    const existing = await Shop.findOne({ $or: [{ name }, { slug }] });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Cette boutique existe déjà'
      });
    }

    const shop = await Shop.create({
      name, slug, sector, description, logo, coverImage,
      ownerName, ownerPhone, whatsappNumber, email, address,
      featured: featured || false,
      subscription: subscription || {}
    });

    res.status(201).json({ success: true, shop });
  } catch (error) {
    console.error('Create shop error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création: ' + error.message
    });
  }
};

// @desc    Update shop
// @route   PUT /api/shops/:id
// @access  Private
const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('sector', 'name slug');

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Boutique non trouvée'
      });
    }

    res.json({ success: true, shop });
  } catch (error) {
    console.error('Update shop error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la modification'
    });
  }
};

// @desc    Delete shop
// @route   DELETE /api/shops/:id
// @access  Private
const deleteShop = async (req, res) => {
  try {
    const productCount = await Product.countDocuments({ shop: req.params.id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Impossible de supprimer (${productCount} produits associés)`
      });
    }

    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Boutique non trouvée'
      });
    }

    res.json({ success: true, message: 'Boutique supprimée' });
  } catch (error) {
    console.error('Delete shop error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression'
    });
  }
};

// @desc    Get shop products
// @route   GET /api/shops/:slug/products
// @access  Public
const getShopProducts = async (req, res) => {
  try {
    const shop = await Shop.findOne({ slug: req.params.slug });
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Boutique non trouvée'
      });
    }

    const products = await Product.find({ shop: shop._id })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (error) {
    console.error('Get shop products error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du chargement des produits'
    });
  }
};

module.exports = {
  getShops,
  getShopBySlug,
  createShop,
  updateShop,
  deleteShop,
  getShopProducts
};
