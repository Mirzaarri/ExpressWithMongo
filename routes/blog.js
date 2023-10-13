const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const { authenticateWithToken} = require('../middleware/usermiddleware');
const { checkUserRole } = require('../middleware/roles')

//posting data..
router.post('/creatblog', authenticateWithToken, checkUserRole(['admin']), blogController.createBlog)
router.post('/creatmultipleblogs', blogController.createMultipleBlogs)
router.get('/getblog', authenticateWithToken, checkUserRole(['admin']), blogController.getData)
router.get('/getblog/:id', blogController.getSingleData)
router.get('/getsingleblog', blogController.getSingleDataWithQuery)
router.get('/getsingleblogtitle', blogController.getSingleDataWithNameQuery)
router.delete('/deleteblog/:id', blogController.deleteData)
router.put('/updateblog/:id', blogController.updateData)
module.exports = router; 