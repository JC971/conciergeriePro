const express = require('express');
const router = express.Router();
const seasonalRentalsController = require('../controllers/seasonalRentalsController');
const authMiddleware = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

// Routes CRUD
router.post('/', seasonalRentalsController.createReport);
router.get('/', seasonalRentalsController.getAllReports);
router.get('/calendar-events', seasonalRentalsController.getCalendarEvents);
router.get('/:id', seasonalRentalsController.getReportById);
router.put('/:id', seasonalRentalsController.updateReport);
router.delete('/:id', seasonalRentalsController.deleteReport);

module.exports = router;
