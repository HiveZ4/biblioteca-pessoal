import axios from 'axios';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:8082';

// Configuração global do Axios
const api = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para adicionar token automaticamente
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

// Interceptor para lidar com erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token inválido ou expirado - fazer logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Melhor tratamento de erros para CORS
    if (error.message === 'Network Error' && !error.response) {
      error.message = 'Problema de conexão com o servidor. Verifique sua internet.';
    }
    
    return Promise.reject(error);
  }
);

// ===== FUNÇÕES DE AUTENTICAÇÃO =====
export const authAPI = {
  register: async (userData) => {
    try {
      return await api.post('/api/auth/register', userData);
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      return await api.get('/api/auth/me');
    } catch (error) {
      console.error('Get profile error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/api/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response;
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      return await api.post('/api/auth/refresh');
    } catch (error) {
      console.error('Refresh token error:', error.response?.data || error.message);
      throw error;
    }
  }
};

// ===== FUNÇÕES DE LIVROS =====
export const bookAPI = {
  getAll: async () => {
    try {
      return await api.get('/api/books');
    } catch (error) {
      console.error('Get books error:', error.response?.data || error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      return await api.get(`/api/books/${id}`);
    } catch (error) {
      console.error('Get book error:', error.response?.data || error.message);
      throw error;
    }
  },

  create: async (bookData) => {
    try {
      return await api.post('/api/books', bookData);
    } catch (error) {
      console.error('Create book error:', error.response?.data || error.message);
      throw error;
    }
  },

  update: async (id, bookData) => {
    try {
      return await api.put(`/api/books/${id}`, bookData);
    } catch (error) {
      console.error('Update book error:', error.response?.data || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      return await api.delete(`/api/books/${id}`);
    } catch (error) {
      console.error('Delete book error:', error.response?.data || error.message);
      throw error;
    }
  },

  search: async (query) => {
    try {
      return await api.get('/api/books/search', { params: { q: query } });
    } catch (error) {
      console.error('Search books error:', error.response?.data || error.message);
      throw error;
    }
  }
};