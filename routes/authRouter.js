const express=require("express");
const passport=require("passport");
const router=express.Router();
const {registerView,registerNewUser,loginView,loginUser,logOut} = require('../controllers/AuthController');
const {validateRegister,checkEmailUnique} = require('../middlewares/validator');

router.route('/register')
.get(registerView)
.post(validateRegister,checkEmailUnique,registerNewUser);

router.route('/login')
.get(loginView)
    .post(passport.authenticate('local', {
      
        failureRedirect: '/auth/login',
    }),loginUser);

router.get("/logout",logOut);



module.exports=router;