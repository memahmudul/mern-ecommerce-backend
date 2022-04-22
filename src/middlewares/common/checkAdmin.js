const checkAdmin = (req,res,next)=>{
    console.log();
    if(req.user.role!=='admin'){
        res.status(400).json({message: 'Access Denied'});
    }else{
        next();
    }
    
}

module.exports = checkAdmin;