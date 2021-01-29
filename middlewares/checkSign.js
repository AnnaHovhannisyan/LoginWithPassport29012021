const checkSign=(req,res,next)=>{
    console.log('chekSign',req.user);
    if(req.user){
        next()
    }else{
        res.redirect('/auth/login')
    }
};

module.exports={
    checkSign
};