const express = require('express');
const router = express.Router();
const albumTrackController = require('../controller/albumTrackLinkController');
/* GET users listing. */

router.post('/track/:trackId',albumTrackController.addSongToPlaylist);
router.get('/track',albumTrackController.getSongsFromAlbum);

module.exports = router;
