const express = require('express');
const router = express.Router();
const search_controller = require('../controllers/searchController');

// POST search form submission
router.post('/', search_controller.searchProduct)

module.exports = router;