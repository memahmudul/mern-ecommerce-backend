const express = require('express');
const router = express.Router();
const { addToCart } = require('../controller/cartController');
const checkUser = require('../middlewares/common/checkUser');
const checkAuthorization = require('../middlewares/common/checkAuthorization');



router.post('/addtocart',checkAuthorization,checkUser,addToCart);

module.exports = router;