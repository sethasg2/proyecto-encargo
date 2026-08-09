require('dotenv').config();
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resource');

const app = express();

// Middlewares globales
app.use(helmet());
app.use(compression());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Redis client para sesiones 
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = createClient({ url: redisUrl });
redisClient.connect().catch(err => {
  console.error('Redis connection error:', err.message);
});

// Configurar store de sesiones con Redis
const redisStore = new RedisStore({ client: redisClient });

app.use(session({
  store: redisStore,
  name: process.env.SESSION_NAME || 'sid',
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2 // 2 horas
  }
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handler simple
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;

