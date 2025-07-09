import axios from 'axios';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:8082';

// Cria uma instância do Axios com configurações globais
const api = axios.create({
  baseURL: URL,
  withCredentials: true, // Permite envio de cookies
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
    // Tratamento de erros de autenticação
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Melhor tratamento de erros para CORS
    if (error.message === 'Network Error' && !error.response) {
      error.message = 'Problema de conexão com o servidor';
    }
    
    return Promise.reject(error);
  }
);

// ===== FUNÇÕES DE AUTENTICAÇÃO =====
export const authService = {
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
  }
};

// ===== FUNÇÕES DE LIVROS =====
export const bookService = {
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
  }
};

export default api;