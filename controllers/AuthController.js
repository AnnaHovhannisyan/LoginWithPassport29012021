const { render } = require("../app");
const UserModel=require('../models/userModel');
class AuthController{
    registerView(req,res){
       let message='';
        res.render('register',{message:"Register"})
    }
  async  registerNewUser(req,res){
        try{
            let user=await UserModel.create({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
            });
            if(!user){
              return res.status(400).json({error:"Unexpected Error"})
            }
           return res.redirect('/auth/login')

        }catch(err){
            console.log('err')

        }

}
loginView(req,res){
      /*  let message='';*/
        res.render('login',{message:"Login"})
}
    loginUser(req,res){
       // console.log('login',req.user);
        res.redirect("/home")

    }

    logOut(req,res){
        req.logout();
        res.redirect('/');
    }
}
module.exports=new AuthController();