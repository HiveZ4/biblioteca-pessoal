import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './auth.css';

// Configuração do Axios para todas as requisições
const api = axios.create({
  baseURL: 'https://biblioteca-pessoal-pd1.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', formData, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.data.token && response.data.user) {
        login(response.data.user, response.data.token);
        navigate('/books');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError(
        error.response?.data?.message || 
        'Erro ao fazer login. Verifique suas credenciais e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Entrar</h2>
          <p>Acesse sua conta do Gerenciador de Livros</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Digite seu email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Digite sua senha"
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Não tem uma conta? 
            <Link to="/register" className="auth-link"> Cadastre-se</Link>
          </p>
          <p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;