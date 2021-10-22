const express = require('express');
const router = express.Router();
const audioStreamController = require('../controller/audioStreamController');
/* GET users listing. */
router.get('/',audioStreamController.streamSong)
module.exports = router;
