const express = require('express');
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs
} = require('../controllers/jobController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', getAllJobs);
router.get('/search', searchJobs);
router.get('/:id', getJobById);

// Protected routes
router.post('/', auth, createJob);
router.put('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);

module.exports = router; 