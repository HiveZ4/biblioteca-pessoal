import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import * as authController from '../../controllers/authController.js';
const cors = require("cors");

const app = express();

// Middlewares padrão
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Configuração CORS
const authCorsOptions = {
  origin: [
    'http://localhost:3000',
    'https://biblioteca-pessoal-pd1.vercel.app',
    'https://biblioteca-pessoal-eta.vercel.app',
  ],
  credentials: true,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors({origin: 'https://biblioteca-pessoal-eta.vercel.app' }));

app.use(cors(authCorsOptions));

// Preflight OPTIONS global
app.options('*', cors(authCorsOptions));

// Rotas de autenticação
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authController.getProfile);
router.post('/logout', authController.logout);

app.use('/api/auth', router);

// Exporta como handler serverless
export default serverless(app);
