const mongoose = require('mongoose');

const seasonalRentalSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    guestsCount: {
        type: Number,
        required: true,
        min: 1
    },
    arrivalTime: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    
    // État des lieux à l'arrivée
    generalState: {
        type: String,
        trim: true
    },
    bedrooms: {
        type: Number,
        min: 0
    },
    bathrooms: {
        type: Number,
        min: 0
    },
    toilets: {
        type: Number,
        min: 0
    },
    arrivalPhotos: [{
        filename: String,
        originalName: String,
        path: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Checklist détaillée
    bbqState: {
        type: String,
        enum: ['ok', 'average', 'bad', 'na'],
        default: 'ok'
    },
    terraceState: {
        type: String,
        enum: ['ok', 'average', 'bad', 'na'],
        default: 'ok'
    },
    trashEmptied: {
        type: String,
        enum: ['yes', 'no'],
        default: 'yes'
    },
    ovenState: {
        type: String,
        enum: ['ok', 'average', 'bad', 'na'],
        default: 'ok'
    },
    dishwasherEmptied: {
        type: String,
        enum: ['yes', 'no'],
        default: 'yes'
    },
    windowsState: {
        type: String,
        enum: ['ok', 'average', 'bad', 'na'],
        default: 'ok'
    },
    comments: {
        type: String,
        trim: true
    },
    
    // Validation de fin d'intervention
    departurePhotos: [{
        filename: String,
        originalName: String,
        path: String,
        uploadDate: {
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

module.exports = mongoose.model('SeasonalRental', seasonalRentalSchema);



