const express = require('express');
const router = express.Router();
const trackController = require('../controller/trackController');
/* GET users listing. */
router.post('/', trackController.addTrack);
router.get('/:id',trackController.getTrackbyId);
module.exports = router;
