const express = require('express');
const router = express.Router();
const {addCategory,getCategories} = require('../controller/categoryController')
const checkAdmin = require('../middlewares/common/checkAdmin');
const checkAuthorization = require('../middlewares/common/checkAuthorization');

router.post('/create',checkAuthorization,checkAdmin,addCategory);
router.get('/get',getCategories);

module.exports = router;