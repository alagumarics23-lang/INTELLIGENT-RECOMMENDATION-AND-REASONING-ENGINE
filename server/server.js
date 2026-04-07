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
    'http://localhost:5173',
    'https://intelligent-recommendation-and-reas.vercel.app',
    'https://intelligent-recommendation-and-reasoning-engine-eksv0dxg4.vercel.app'
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// This syntax is safer for modern Express versions to handle preflights
app.options('(.*)', cors(corsOptions));

app.use(express.json());

// ==========================================
// Routes
// ==========================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/recommendations', require('./routes/recommendations'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'IRRE Backend is Live!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'IRRE API is running perfectly!' });
});

// ==========================================
// Database Connection & Server Initialization
// ==========================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully ✨');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });