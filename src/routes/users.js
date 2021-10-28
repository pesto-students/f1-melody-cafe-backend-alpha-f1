const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
/* GET users listing. */
//router.get('/:id', userController.getUserById);
router.post('/',userController.addUser);
router.get('/:id',userController.getUserById)
router.put('/:id',userController.editUser);

module.exports = router;
