const mongoose = require('mongoose');

const caretakingSchema = new mongoose.Schema({
    // Informations générales
    villaName: {
    type: String,
    required: true,
    trim: true
  },
  villaId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  propertyAddress: {
    type: String,
    required: true,
    trim: true
  },
  visitDate: {
    type: Date,
    required: true
  },
  ownerArrival: {
    type: Date,
    required: true
  },
  ownerDeparture: {
    type: Date,
    required: true
  },
  peopleCount: {
    type: Number,
    required: true,
    min: 1
  },
  
  // État des lieux détaillé
  interiorComment: {
    type: String,
    trim: true
  },
  interiorPhotos: [{
    filename: String,
    originalName: String,
    path: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  exteriorComment: {
    type: String,
    trim: true
  },
  exteriorPhotos: [{
    filename: String,
    originalName: String,
    path: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Commentaires spécifiques
  specificComments: [{
    area: {
      type: String,
      required: true,
      trim: true
    },
    comment: {
      type: String,
      required: true,
      trim: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Métadonnées
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'completed'],
    default: 'draft'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Caretaking', caretakingSchema);

