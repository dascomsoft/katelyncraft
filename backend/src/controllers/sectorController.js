const Sector = require('../models/Sector');
const Shop = require('../models/Shop');
const { slugify } = require('../utils/slugify');

// @desc    Get all sectors
// @route   GET /api/sectors
// @access  Public
const getSectors = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = {};
    if (active === 'true') filter.active = true;

    const sectors = await Sector.find(filter).sort({ order: 1, name: 1 }).lean();

    // Ajouter le nombre de boutiques par secteur
    const sectorsWithCount = await Promise.all(
      sectors.map(async (sector) => {
        const shopCount = await Shop.countDocuments({ 
          sector: sector._id, 
          status: 'active' 
        });
        return { ...sector, shopCount };
      })
    );

    res.json({
      success: true,
      sectors: sectorsWithCount
    });
  } catch (error) {
    console.error('Get sectors error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du chargement des secteurs'
    });
  }
};

// @desc    Get sector by slug
// @route   GET /api/sectors/:slug
// @access  Public
const getSectorBySlug = async (req, res) => {
  try {
    const sector = await Sector.findOne({ slug: req.params.slug });
    if (!sector) {
      return res.status(404).json({
        success: false,
        message: 'Secteur non trouvé'
      });
    }

    const shops = await Shop.find({ sector: sector._id, status: 'active' })
      .sort({ featured: -1, name: 1 });

    res.json({
      success: true,
      sector,
      shops
    });
  } catch (error) {
    console.error('Get sector error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du chargement du secteur'
    });
  }
};

// @desc    Create sector
// @route   POST /api/sectors
// @access  Private
const createSector = async (req, res) => {
  try {
    const { name, description, icon, color, image, order } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Le nom est requis'
      });
    }

    const slug = slugify(name);
    const existing = await Sector.findOne({ $or: [{ name }, { slug }] });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Ce secteur existe déjà'
      });
    }

    const sector = await Sector.create({
      name, slug, description, icon, color, image, order: order || 0
    });

    res.status(201).json({ success: true, sector });
  } catch (error) {
    console.error('Create sector error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du secteur'
    });
  }
};

// @desc    Update sector
// @route   PUT /api/sectors/:id
// @access  Private
const updateSector = async (req, res) => {
  try {
    const sector = await Sector.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!sector) {
      return res.status(404).json({
        success: false,
        message: 'Secteur non trouvé'
      });
    }

    res.json({ success: true, sector });
  } catch (error) {
    console.error('Update sector error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la modification'
    });
  }
};

// @desc    Delete sector
// @route   DELETE /api/sectors/:id
// @access  Private
const deleteSector = async (req, res) => {
  try {
    const shopCount = await Shop.countDocuments({ sector: req.params.id });
    if (shopCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Impossible de supprimer ce secteur (${shopCount} boutique(s) associée(s))`
      });
    }

    const sector = await Sector.findByIdAndDelete(req.params.id);
    if (!sector) {
      return res.status(404).json({
        success: false,
        message: 'Secteur non trouvé'
      });
    }

    res.json({ success: true, message: 'Secteur supprimé' });
  } catch (error) {
    console.error('Delete sector error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression'
    });
  }
};

module.exports = {
  getSectors,
  getSectorBySlug,
  createSector,
  updateSector,
  deleteSector
};
