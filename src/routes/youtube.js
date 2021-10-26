const express = require('express');
const router = express.Router();

const youtubeController = require('../controller/youtubeController');

router.get('/songsList',youtubeController.getSongs);
router.get('/playList/:id',youtubeController.getPlaylistData);
router.get('/playlistItem/:playlistId',youtubeController.getPlaylistItems);
module.exports = router;