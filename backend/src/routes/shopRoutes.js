const express = require('express');
const {
  getShops,
  getShopBySlug,
  createShop,
  updateShop,
  deleteShop,
  getShopProducts
} = require('../controllers/shopController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getShops);
router.get('/:slug', getShopBySlug);
router.get('/:slug/products', getShopProducts);
router.post('/', protect, createShop);
router.put('/:id', protect, updateShop);
router.delete('/:id', protect, deleteShop);

module.exports = router;
