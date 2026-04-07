const express = require('express');
const router = express.Router();
const { generateRecommendations, getUserRecommendations } = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUserRecommendations).post(protect, generateRecommendations);

module.exports = router;
