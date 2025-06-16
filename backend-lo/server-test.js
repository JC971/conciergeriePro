const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de sécurité
app.use(helmet());

// Configuration CORS
const allowedOrigins = [
 
  'http://localhost:5174'
];

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));


// Middleware de logging
app.use(morgan('combined'));

// Middleware pour parser JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

console.log('Mode test: MongoDB désactivé pour la démonstration');

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'API ConciergePro fonctionne correctement',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'test'
  });
});

// Routes de test simplifiées
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simulation d'authentification
  if (email && password) {
    res.json({
      message: 'Connexion réussie',
      token: 'test-token-' + Date.now(),
      user: {
        id: 1,
        email: email,
        firstName: 'Test',
        lastName: 'User',
        role: 'employee'
      }
    });
  } else {
    res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }
});

app.get('/api/auth/profile', (req, res) => {
  res.json({
    user: {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'employee'
    }
  });
});

app.post('/api/seasonal-rentals', (req, res) => {
  console.log('Rapport reçu:', req.body);
  res.status(201).json({
    message: 'Rapport de location saisonnière créé avec succès',
    report: { id: Date.now(), ...req.body }
  });
});

app.get('/api/seasonal-rentals/calendar-events', (req, res) => {
  res.json({
    events: [
      {
        id: 1,
        title: 'Villa Test - Arrivée',
        start: new Date().toISOString(),
        end: new Date(Date.now() + 86400000).toISOString(),
        type: 'seasonal-rental'
      }
    ]
  });
});

app.get('/api/caretaking/calendar-events', (req, res) => {
  res.json({
    events: [
      {
        id: 2,
        title: 'Villa Test - Inspection',
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        type: 'inspection'
      }
    ]
  });
});

app.post('/api/upload/multiple', (req, res) => {
  res.json({
    message: 'Fichiers téléchargés avec succès (simulation)',
    files: [
      {
        filename: 'test-file-' + Date.now() + '.jpg',
        originalName: 'test.jpg',
        path: '/uploads/test-file.jpg',
        size: 1024,
        mimetype: 'image/jpeg'
      }
    ]
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
  console.log(`Serveur de test démarré sur le port ${PORT}`);
  console.log(`Environnement: ${process.env.NODE_ENV || 'test'}`);
});

