const express = require('express');
const router = express.Router();
const caretakingController = require('../controllers/caretakingController');
const authMiddleware = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

// Routes CRUD
router.post('/', caretakingController.createReport);
router.get('/', caretakingController.getAllReports);
router.get('/calendar-events', caretakingController.getCalendarEvents);
router.get('/:id', caretakingController.getReportById);
router.put('/:id', caretakingController.updateReport);
router.delete('/:id', caretakingController.deleteReport);

module.exports = router;
