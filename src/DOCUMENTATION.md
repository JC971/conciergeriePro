# ConciergePro - Documentation Complète

## Table des Matières
1. [Présentation](#présentation)
2. [Architecture](#architecture)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Utilisation](#utilisation)
6. [API Documentation](#api-documentation)
7. [Déploiement](#déploiement)
8. [Maintenance](#maintenance)

## Présentation

ConciergePro est une application web moderne de gestion de conciergerie immobilière, spécialement conçue pour les locations saisonnières et le gardiennage de propriétés. L'application offre une interface intuitive et responsive pour gérer efficacement les interventions et le suivi des propriétés.

### Fonctionnalités Principales

- **Gestion des Locations Saisonnières** : Suivi des arrivées/départs, rapports d'intervention détaillés
- **Gestion du Gardiennage** : Visites d'inspection, suivi des séjours propriétaires
- **Calendriers Intégrés** : Vue d'ensemble des événements et planification
- **Upload d'Images** : Documentation photographique des interventions
- **Internationalisation** : Support français et anglais
- **Interface Responsive** : Optimisée pour mobile, tablette et desktop
- **Authentification Sécurisée** : Système JWT pour la protection des données

### Technologies Utilisées

**Frontend :**
- React 18 avec Vite
- React Router pour la navigation
- React Big Calendar pour les calendriers
- React i18next pour l'internationalisation
- Axios pour les appels API
- CSS modules (sans frameworks externes)

**Backend :**
- Node.js avec Express.js
- MongoDB avec Mongoose
- JWT pour l'authentification
- Multer pour l'upload de fichiers
- Helmet pour la sécurité
- CORS pour les requêtes cross-origin

## Architecture

### Structure du Projet

```
ConciergePro/
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/          # Pages de l'application
│   │   ├── context/        # Contextes React (Auth, etc.)
│   │   ├── hooks/          # Hooks personnalisés
│   │   ├── utils/          # Utilitaires (API, i18n)
│   │   ├── styles/         # Fichiers CSS modulaires
│   │   ├── assets/         # Images et ressources
│   │   └── locales/        # Fichiers de traduction
│   ├── public/             # Fichiers statiques
│   └── package.json        # Dépendances frontend
├── backend/                 # API Node.js
│   ├── models/             # Modèles Mongoose
│   ├── routes/             # Routes Express
│   ├── controllers/        # Logique métier
│   ├── middleware/         # Middleware personnalisés
│   ├── uploads/            # Fichiers uploadés
│   ├── server.js           # Point d'entrée
│   └── package.json        # Dépendances backend
└── README.md               # Documentation
```

### Architecture Technique

L'application suit une architecture client-serveur avec séparation claire des responsabilités :

- **Frontend React** : Interface utilisateur responsive et interactive
- **API REST** : Backend Express.js avec endpoints sécurisés
- **Base de données MongoDB** : Stockage des données avec schémas Mongoose
- **Authentification JWT** : Sécurisation des accès et sessions utilisateur

## Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- MongoDB (version 5.0 ou supérieure)
- Git

### Installation du Frontend

```bash
# Cloner le projet
git clone <repository-url>
cd ConciergePro/frontend

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Installation du Backend

```bash
# Aller dans le dossier backend
cd ../backend

# Installer les dépendances
npm install

# Démarrer le serveur
npm run dev
```

L'API sera accessible sur `http://localhost:3001`

### Installation de MongoDB

**Ubuntu/Debian :**
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Windows :**
Télécharger et installer MongoDB Community Server depuis le site officiel.

**macOS :**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

## Configuration

### Variables d'Environnement Backend

Créer un fichier `.env` dans le dossier `backend/` :

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=votre_clé_secrète_jwt_très_sécurisée
MONGODB_URI=mongodb://localhost:27017/conciergepro
CORS_ORIGIN=http://localhost:5173
```

### Configuration Frontend

Le frontend utilise des variables d'environnement pour l'URL de l'API. Créer un fichier `.env` dans le dossier `frontend/` :

```env
VITE_API_URL=http://localhost:3001/api
```

### Configuration MongoDB

Créer la base de données et un utilisateur dédié :

```javascript
// Se connecter à MongoDB
use conciergepro

// Créer un utilisateur pour l'application
db.createUser({
  user: "conciergepro_user",
  pwd: "mot_de_passe_sécurisé",
  roles: [
    { role: "readWrite", db: "conciergepro" }
  ]
})
```

## Utilisation

### Première Connexion

1. Démarrer MongoDB, le backend et le frontend
2. Accéder à `http://localhost:5173`
3. Créer un compte utilisateur via l'API ou directement en base
4. Se connecter avec les identifiants créés

### Navigation dans l'Application

**Tableau de Bord :**
- Vue d'ensemble avec les deux calendriers
- Événements des locations saisonnières et du gardiennage
- Navigation rapide vers les modules

**Locations Saisonnières :**
- Formulaire de rapport d'intervention complet
- Sections : Informations générales, État des lieux, Checklist détaillée
- Upload de photos à l'arrivée et au départ
- Validation et sauvegarde des rapports

**Gardiennage :**
- Formulaire de visite d'inspection
- Gestion des séjours propriétaires
- Commentaires détaillés par zone
- Documentation photographique

### Gestion des Utilisateurs

L'application supporte deux types d'utilisateurs :
- **Employés** : Accès aux fonctionnalités de base
- **Administrateurs** : Accès complet et gestion des utilisateurs

### Upload d'Images

- Formats supportés : JPEG, PNG, WebP, GIF
- Taille maximale : 5MB par fichier
- Maximum 10 fichiers par upload
- Stockage local dans le dossier `backend/uploads/`

## API Documentation

### Authentification

**POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**POST /api/auth/register**
```json
{
  "email": "user@example.com",
  "password": "password",
  "firstName": "John",
  "lastName": "Doe",
  "role": "employee"
}
```

**GET /api/auth/profile**
Headers: `Authorization: Bearer <token>`

### Locations Saisonnières

**POST /api/seasonal-rentals**
Créer un nouveau rapport de location saisonnière

**GET /api/seasonal-rentals**
Récupérer tous les rapports avec pagination

**GET /api/seasonal-rentals/:id**
Récupérer un rapport spécifique

**PUT /api/seasonal-rentals/:id**
Mettre à jour un rapport

**DELETE /api/seasonal-rentals/:id**
Supprimer un rapport

**GET /api/seasonal-rentals/calendar-events**
Récupérer les événements pour le calendrier

### Gardiennage

**POST /api/caretaking**
Créer un nouveau rapport de gardiennage

**GET /api/caretaking**
Récupérer tous les rapports avec pagination

**GET /api/caretaking/:id**
Récupérer un rapport spécifique

**PUT /api/caretaking/:id**
Mettre à jour un rapport

**DELETE /api/caretaking/:id**
Supprimer un rapport

**GET /api/caretaking/calendar-events**
Récupérer les événements pour le calendrier

### Upload de Fichiers

**POST /api/upload/single**
Upload d'un seul fichier

**POST /api/upload/multiple**
Upload de plusieurs fichiers

## Déploiement

### Déploiement en Production

**1. Préparation du Frontend**
```bash
cd frontend
npm run build
```

**2. Configuration du Serveur**
- Installer Node.js et MongoDB sur le serveur
- Configurer un reverse proxy (Nginx recommandé)
- Configurer HTTPS avec Let's Encrypt

**3. Variables d'Environnement Production**
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=clé_très_sécurisée_pour_production
MONGODB_URI=mongodb://user:password@localhost:27017/conciergepro
CORS_ORIGIN=https://votre-domaine.com
```

**4. Démarrage des Services**
```bash
# Backend
cd backend
npm start

# Ou avec PM2 pour la gestion des processus
pm2 start server.js --name "conciergepro-api"
```

### Configuration Nginx

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    # Frontend
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Fichiers uploadés
    location /uploads {
        proxy_pass http://localhost:3001;
    }
}
```

### Sécurité en Production

- Utiliser HTTPS obligatoirement
- Configurer des mots de passe forts pour MongoDB
- Limiter les accès réseau avec un firewall
- Mettre en place des sauvegardes automatiques
- Configurer la rotation des logs
- Utiliser des variables d'environnement pour les secrets

## Maintenance

### Logs et Monitoring

**Logs Backend :**
Les logs sont générés automatiquement par Morgan. Pour la production, configurer Winston pour une gestion avancée des logs.

**Monitoring :**
- Utiliser PM2 pour le monitoring des processus Node.js
- Configurer des alertes pour les erreurs critiques
- Surveiller l'utilisation des ressources (CPU, mémoire, disque)

### Sauvegardes

**Base de Données :**
```bash
# Sauvegarde
mongodump --db conciergepro --out /path/to/backup/

# Restauration
mongorestore --db conciergepro /path/to/backup/conciergepro/
```

**Fichiers Uploadés :**
```bash
# Sauvegarde des uploads
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz backend/uploads/
```

### Mises à Jour

1. Tester les mises à jour en environnement de développement
2. Sauvegarder la base de données et les fichiers
3. Mettre à jour les dépendances npm
4. Redémarrer les services
5. Vérifier le bon fonctionnement

### Dépannage

**Problèmes Courants :**

- **Erreur de connexion MongoDB** : Vérifier que MongoDB est démarré et accessible
- **Erreur CORS** : Vérifier la configuration CORS_ORIGIN
- **Problème d'upload** : Vérifier les permissions du dossier uploads/
- **Erreur JWT** : Vérifier la configuration JWT_SECRET

**Commandes Utiles :**
```bash
# Vérifier les logs
pm2 logs conciergepro-api

# Redémarrer l'application
pm2 restart conciergepro-api

# Vérifier l'état de MongoDB
sudo systemctl status mongodb

# Vérifier les connexions réseau
netstat -tlnp | grep :3001
```

---

**ConciergePro v1.0** - Application développée avec React, Node.js et MongoDB