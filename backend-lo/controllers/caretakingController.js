const Caretaking = require('../models/Caretaking');

// Créer un nouveau rapport de gardiennage
const createReport = async (req, res) => {
  try {
    const reportData = {
      ...req.body,
      createdBy: req.user._id
    };

    const report = new Caretaking(reportData);
    await report.save();

    res.status(201).json({
      message: 'Rapport de gardiennage créé avec succès',
      report
    });
  } catch (error) {
    console.error('Erreur lors de la création du rapport:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Obtenir tous les rapports de gardiennage
const getAllReports = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (startDate && endDate) {
      filter.visitDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const reports = await Caretaking.find(filter)
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Caretaking.countDocuments(filter);

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
    const report = await Caretaking.findById(req.params.id)
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
    const report = await Caretaking.findByIdAndUpdate(
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
    const report = await Caretaking.findByIdAndDelete(req.params.id);

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
      filter.visitDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const reports = await Caretaking.find(filter)
      .select('visitDate ownerArrival ownerDeparture peopleCount status')
      .sort({ visitDate: 1 });

    const events = [];
    
    reports.forEach(report => {
      // Événement de visite d'inspection
      events.push({
        id: `inspection-${report._id}`,
        title: `Visite inspection - ${report.peopleCount} personnes`,
        start: report.visitDate,
        end: report.visitDate,
        type: 'inspection',
        status: report.status,
        reportId: report._id
      });

      // Événement de séjour propriétaire
      events.push({
        id: `owner-stay-${report._id}`,
        title: `Séjour propriétaire - ${report.peopleCount} personnes`,
        start: report.ownerArrival,
        end: report.ownerDeparture,
        type: 'owner-stay',
        status: report.status,
        reportId: report._id
      });
    });

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

