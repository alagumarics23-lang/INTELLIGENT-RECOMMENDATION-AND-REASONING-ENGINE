const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseById, createCourse } = require('../controllers/courseController');
// const { protect } = require('../middleware/authMiddleware'); // will be used if creating course needs auth

router.route('/').get(getAllCourses).post(createCourse);
router.route('/:id').get(getCourseById);

module.exports = router;
