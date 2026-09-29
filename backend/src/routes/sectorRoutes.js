const express = require('express');
const {
  getSectors,
  getSectorBySlug,
  createSector,
  updateSector,
  deleteSector
} = require('../controllers/sectorController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getSectors);
router.get('/:slug', getSectorBySlug);
router.post('/', protect, createSector);
router.put('/:id', protect, updateSector);
router.delete('/:id', protect, deleteSector);

module.exports = router;
