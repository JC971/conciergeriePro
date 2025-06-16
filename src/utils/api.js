import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Configuration d'axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services d'authentification
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

// Services pour les locations saisonnières
export const seasonalRentalsService = {
  createReport: async (reportData) => {
    const response = await api.post('/seasonal-rentals', reportData);
    return response.data;
  },
  
  getAllReports: async (params = {}) => {
    const response = await api.get('/seasonal-rentals', { params });
    return response.data;
  },
  
  getReportById: async (id) => {
    const response = await api.get(`/seasonal-rentals/${id}`);
    return response.data;
  },
  
  updateReport: async (id, reportData) => {
    const response = await api.put(`/seasonal-rentals/${id}`, reportData);
    return response.data;
  },
  
  deleteReport: async (id) => {
    const response = await api.delete(`/seasonal-rentals/${id}`);
    return response.data;
  },
  
  getCalendarEvents: async (params = {}) => {
    const response = await api.get('/seasonal-rentals/calendar-events', { params });
    return response.data;
  }
};

// Services pour le gardiennage
export const caretakingService = {
  createReport: async (reportData) => {
    const response = await api.post('/caretaking', reportData);
    return response.data;
  },
  
  getAllReports: async (params = {}) => {
    const response = await api.get('/caretaking', { params });
    return response.data;
  },
  
  getReportById: async (id) => {
    const response = await api.get(`/caretaking/${id}`);
    return response.data;
  },
  
  updateReport: async (id, reportData) => {
    const response = await api.put(`/caretaking/${id}`, reportData);
    return response.data;
  },
  
  deleteReport: async (id) => {
    const response = await api.delete(`/caretaking/${id}`);
    return response.data;
  },
  
  getCalendarEvents: async (params = {}) => {
    const response = await api.get('/caretaking/calendar-events', { params });
    return response.data;
  }
};

// Services pour l'upload de fichiers
export const uploadService = {
  uploadSingle: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  uploadMultiple: async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    const response = await api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default api;

