const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// Middleware & CORS Configuration
// ==========================================
const corsOptions = {
  origin: [
    'http://localhost:5173', // For local development
    'https://intelligent-recommendation-and-reas.vercel.app',
    'https://intelligent-recommendation-and-reasoning-engine-eksv0dxg4.vercel.app', // Your specific live URL
    /\.vercel\.app$/ // This regex allows any deployment URL from Vercel
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS with options
app.use(cors(corsOptions));

// Handle preflight requests explicitly (helps with "hanging" preflights)
app.options('*', cors(corsOptions));

app.use(express.json());

// ==========================================
// Routes
// ==========================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/recommendations', require('./routes/recommendations'));

// Base Route (Fixes the "Cannot GET /" message on Render)
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'IRRE Backend is Live!' });
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'IRRE API is running perfectly!' });
});

// ==========================================
// Database Connection & Server Initialization
// ==========================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully ✨');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });