const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Inscription
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Hasher le mot de passe
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Créer l'utilisateur
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || 'employee'
    });

    await user.save();

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Obtenir le profil utilisateur
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = {
  register,
  login,
  getProfile
};

