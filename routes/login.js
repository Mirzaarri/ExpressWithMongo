const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const { authenticateWithToken} = require('../middleware/usermiddleware');
const { checkUserRole } = require('../middleware/roles')

// Posting data...
router.post('/signup', loginController.signupUser);
router.post('/signin', loginController.loginUser);
router.post('/forgotpassword', loginController.forgotPassword);
router.put('/resetpassword', loginController.resetPassword);

// Get data with role-based access
router.get('/getdata', authenticateWithToken, checkUserRole(['admin']), loginController.getAllData);

module.exports = router;
