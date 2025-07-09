const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { authenticateToken } = require('../../middleware/auth');
const cors = require('cors');

const authCorsOptions = {
  origin: [
    'http://localhost:3000', // Desenvolvimento // Seu frontend
    'https://biblioteca.pessoal.eta.vercel.app',
    'https://vercel.com/hivez4s-projects/biblioteca-pessoal-front/AYo3eaSgmdf8N7Yy1Qi3QoCaYYjP'
  ],
  credentials: true,
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Aplica CORS especificamente nas rotas de auth
router.use(cors(authCorsOptions));

// OPTIONS handler para preflight
router.options('*', cors(authCorsOptions));

// POST /api/auth/register - Registrar novo usuário
router.post('/register', authController.register);

// POST /api/auth/login - Login do usuário
router.post('/login', authController.login);

// GET /api/auth/me - Obter perfil do usuário logado (rota protegida)
router.get('/me', authenticateToken, authController.getProfile);

// POST /api/auth/logout - Logout do usuário (rota protegida)
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;

