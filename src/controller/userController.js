const User = require('../models/user')
const jwt = require('jsonwebtoken');

const signUp = (req,res)=>{

    
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(user){
            res.status(400).json({message:'User already registered'})
        }else{
            const {firstName,lastName,email,password} = req.body;
            const _user = new User({firstName,lastName,email,password,username:Math.random().toString()});

            _user.save((error,data)=>{
                if(error){
                    res.status(400).json({message:'Something went wrong'})
                }else{
                    res.status(201).json({message: "User created Successfully"});
                }
            })
        }
    })

}


const signIn = (req,res)=>{
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(error){
            res.status(400).json({message: error})
        }else{
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id,role:user.role},process.env.JWT_SECRET,{expiresIn: '1h'});
                const {_id,firstName,lastName,email,role,fullName,password} = user;
                res.status(200).json({
                    token,
                    user:{
                        _id,firstName,lastName,email,role,fullName,password,
                    }
                })

            }else{
                res.status(400).json({message: "Invalid Password"});
            }
        }

    })

}

module.exports = {
    signUp,
    signIn
}