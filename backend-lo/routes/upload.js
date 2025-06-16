const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

// Upload de fichiers multiples
router.post('/multiple', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé' });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: `/uploads/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.json({
      message: 'Fichiers téléchargés avec succès',
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    res.status(500).json({ message: 'Erreur lors du téléchargement des fichiers' });
  }
});

// Upload d'un seul fichier
router.post('/single', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé' });
    }

    const uploadedFile = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
      size: req.file.size,
      mimetype: req.file.mimetype
    };

    res.json({
      message: 'Fichier téléchargé avec succès',
      file: uploadedFile
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    res.status(500).json({ message: 'Erreur lors du téléchargement du fichier' });
  }
});

module.exports = router;

