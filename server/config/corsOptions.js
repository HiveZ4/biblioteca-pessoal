const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  "https://biblioteca-pessoal-eta.vercel.app/",
  "https://vercel.com/hivez4s-projects/biblioteca-pessoal/EQuqyhzG2garUY2k4HNZCrBvqT8r",
  "https://biblioteca-pessoal-eta.vercel.app/login",
  "https://biblioteca-pessoal-eta.vercel.app/register",
  "https://biblioteca-pessoal-pd1.vercel.app/api/auth/login",
  "https://biblioteca-pessoal-pd1.vercel.app/api/auth/register",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

module.exports = corsOptions;

