const express = require('express');
const checkAuthorization = require('../middlewares/common/checkAuthorization');
const router = express.Router();
const {checkValidation,signInValidation,signUpValidation} =  require('../middlewares/common/checkValidation');

const User = require('../models/user');
const {signUp} = require('../controller/admin/adminAuth');
const {signIn} = require('../controller/admin/adminAuth');
router.post('/signup',signUpValidation,checkValidation,signUp);
router.post('/signin',signInValidation,checkValidation,signIn)


module.exports = router;