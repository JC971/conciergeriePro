import dotenv from 'dotenv';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de sécurité
app.use(helmet());

dotenv.config();

const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ Origin non autorisée : ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// Middleware de logging
app.use(morgan('combined'));

// Middleware pour parser JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/debug/db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    res.json({
      status: 'ok',
      database: mongoose.connection.name,
      collections: collectionNames
    });
  } catch (err) {
    console.error("❌ Erreur dans /api/debug/db :", err);
    res.status(500).json({ message: "Erreur lors de l'accès à la base de données" });
  }
});



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/conciergepro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connexion à MongoDB réussie');
})
.catch((error) => {
  console.error('❌ Erreur de connexion à MongoDB:', error);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/seasonal-rentals', require('./routes/seasonalRentals'));
app.use('/api/caretaking', require('./routes/caretaking'));
app.use('/api/upload', require('./routes/upload'));

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'API ConciergePro fonctionne correctement',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Environnement: ${process.env.NODE_ENV}`);
});


