const UserModel=require('../models/userModel');
const joi=require('@hapi/joi');

const validateRegister=(req,res,next)=>{
    const schema=joi.object({
        username:joi.string().min(5).max(255).required(),
        email:joi.string().min(5).max(255).required().email(),
        password:joi.string().min(5).max(255).required(),
    });
    const {error}=schema.validate(req.body);

    next()
};
const validateLogin=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().min(5).max(255).required().email(),
        password:joi.string().min(5).max(255).required()
    });
    const {error}=schema.validate(req.body);
    next()
};
const checkEmailUnique=async (req,res,next)=>{
    try{
        let  user=await UserModel.findOne({email:req.body.email});
        if(user) return res.status(400).json({error:"Email is taken"});
        next()
    }catch(err){
        if(err) return res.status(400).json({error:err})
    }
};
module.exports={
    validateLogin,
    validateRegister,
    checkEmailUnique
};
