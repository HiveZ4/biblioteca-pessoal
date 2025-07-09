const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { authenticateToken } = require('../../middleware/auth');
const cors = require('cors');

const authCorsOptions = {
  origin: [
    'http://localhost:3000', // Desenvolvimento // Seu frontend
    'https://biblioteca-pessoal-pd1.vercel.app',
    'https://biblioteca-pessoal-eta.vercel.app',
  ],
  credentials: true,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Aplica CORS especificamente nas rotas de auth
router.use(cors(authCorsOptions));

// OPTIONS handler para preflight
router.options('*', cors(authCorsOptions));

// POST /api/auth/register - Registrar novo usuário
router.post('/register', authController.register);
router.options('/register', cors(authCorsOptions));

// POST /api/auth/login - Login do usuário
router.post('/login', authController.login);
router.options('/login', cors(authCorsOptions));

// GET /api/auth/me - Obter perfil do usuário logado (rota protegida)
router.get('/me', authenticateToken, authController.getProfile);

// POST /api/auth/logout - Logout do usuário (rota protegida)
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;

