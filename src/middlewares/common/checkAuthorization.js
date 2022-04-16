const jwt = require('jsonwebtoken')

const checkAuthorization = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token,process.env.JWT_SECRET);
    
        req.user = user;
        next();
    }catch(error){
        next(error);
    }
   

    

}

module.exports = checkAuthorization;