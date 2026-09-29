const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la boutique est requis'],
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
  sector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector',
    required: [true, 'Le secteur est requis']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  logo: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  ownerName: {
    type: String,
    required: [true, 'Le nom du propriétaire est requis'],
    trim: true
  },
  ownerPhone: {
    type: String,
    required: [true, 'Le numéro de téléphone est requis'],
    trim: true
  },
  whatsappNumber: {
    type: String,
    required: [true, 'Le numéro WhatsApp est requis'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: ''
  },
  address: {
    type: String,
    trim: true,
    default: 'Yaoundé, Cameroun'
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended'],
    default: 'active'
  },
  verified: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'starter', 'pro', 'premium'],
      default: 'free'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'trial'],
      default: 'trial'
    }
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalProducts: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Shop', shopSchema);
