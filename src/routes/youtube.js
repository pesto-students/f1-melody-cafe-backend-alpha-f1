const express = require('express');
const router = express.Router();

const youtubeController = require('../controller/youtubeController');
router.get('/songsList',youtubeController.getSongs);
module.exports = router;