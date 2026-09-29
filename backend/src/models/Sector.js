const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du secteur est requis'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  icon: {
    type: String,
    default: 'FolderTree'
  },
  color: {
    type: String,
    default: 'from-blue-500 to-blue-600'
  },
  image: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sector', sectorSchema);
