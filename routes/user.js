const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

//posting data
router.post('/createuser',userController.createdata)
router.get('/getAllData', userController.getAllData)
router.get('/getuser/:id', userController.getSingleData)
router.get('/getuser', userController.getSingleDataWithQuery)
router.delete('/deleteuser/:id', userController.deleteData)
router.patch('/updateuser/:id', userController.updateData)
module.exports = router; 