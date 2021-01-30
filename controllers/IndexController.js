const UserModel=require("../models/userModel");
const path=require('path');
let fs=require('fs');

class IndexController{
    index(req,res){
        res.render('index');
    }
    home(req,res){
       // console.log(req.user);
        res.render('home',{userInfo:req.user})
    }


    async changePhoto(req,res){

         try{

        let user= await UserModel.findOne({_id:req.user._id});
try{
    if(user.image && user.image!=='default_profile.png'){
        fs.unlink(path.join(__dirname,'..','/public/images/',user.image),(err)=>{
            console.log('done');
        });

    }

}catch(err){
    console.log(err);
}
        user.image=req.file.filename;
        let newInfo=await user.save();
        res.json(newInfo.image);

        }catch(err){
            if(err) return res.status(400).json({error:err})
        }

    }


}
module.exports =new IndexController();