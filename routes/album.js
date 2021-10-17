const express = require('express');
const router = express.Router();
const albumController = require('../controller/albumController');
/* GET users listing. */
router.post('/', albumController.addAlbum);
router.get('/',albumController.getAlbums);
router.get('/:id',albumController.getAlbumById);

module.exports = router;
