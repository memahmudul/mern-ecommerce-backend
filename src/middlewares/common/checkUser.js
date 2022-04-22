const checkUser = (req,res,next)=>{
    
    if(req.user.role!=='user'){
        res.status(400).json({message: 'Access Denied'});
    }else{
        next();
    }
    
}

module.exports = checkUser;