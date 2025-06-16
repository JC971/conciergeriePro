const SeasonalRental = require('../models/SeasonalRental');

// Créer un nouveau rapport de location saisonnière
const createReport = async (req, res) => {
  try {
    const reportData = {
      ...req.body,
      createdBy: req.user._id
    };

    const report = new SeasonalRental(reportData);
    await report.save();

    res.status(201).json({
      message: 'Rapport de location saisonnière créé avec succès',
      report
    });
  } catch (error) {
    console.error('Erreur lors de la création du rapport:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Obtenir tous les rapports de locations saisonnières
const getAllReports = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const reports = await SeasonalRental.find(filter)
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SeasonalRental.countDocuments(filter);

    res.json({
      reports,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des rapports:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Obtenir un rapport spécifique
const getReportById = async (req, res) => {
  try {
    const report = await SeasonalRental.findById(req.params.id)
      .populate('createdBy', 'firstName lastName email');

    if (!report) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    res.json({ report });
  } catch (error) {
    console.error('Erreur lors de la récupération du rapport:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Mettre à jour un rapport
const updateReport = async (req, res) => {
  try {
    const report = await SeasonalRental.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName email');

    if (!report) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    res.json({
      message: 'Rapport mis à jour avec succès',
      report
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rapport:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Supprimer un rapport
const deleteReport = async (req, res) => {
  try {
    const report = await SeasonalRental.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    res.json({ message: 'Rapport supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du rapport:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Obtenir les événements pour le calendrier
const getCalendarEvents = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const filter = {};
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const reports = await SeasonalRental.find(filter)
      .select('date address guestsCount arrivalTime departureDate status')
      .sort({ date: 1 });

    const events = reports.map(report => ({
      id: report._id,
      title: `${report.address} - ${report.guestsCount} personnes`,
      start: report.date,
      end: report.departureDate,
      type: 'seasonal-rental',
      status: report.status
    }));

    res.json({ events });
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  getCalendarEvents
};

