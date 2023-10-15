const express = require('express');
const router = express.Router();


const quantityController = require('../controllers/quantity')

router.post('/quantity', quantityController.createQuantity);
router.get('/products/:productId/quantity', quantityController.getQuantityByProductId);
router.get('/users/:userId/quantity', quantityController.getQuantityByUserId);

module.exports = router;