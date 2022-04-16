const {check} = require('express-validator');

const signInValidation = [
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('Last Name is required'),
    check('email').isEmail().withMessage('Valid Email is required'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 character long'),

];
const signUpValidation = [
    
    check('email').isEmail().withMessage('Valid Email is required'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 character long'),

];






const {validationResult} = require('express-validator');

const checkValidation = (req,res,next)=>{
    
    const errors = validationResult(req);


    if(errors.array().length>0){
        return res.status(400).json({error: errors.array()[0].msg});
    }
        next();


}

module.exports = {
    checkValidation,
    signInValidation,
    signUpValidation
};