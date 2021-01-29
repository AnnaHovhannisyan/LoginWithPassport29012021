const passport = require('passport');
const LocalStrategy=require("passport-local");

const UserModel=require("../models/userModel");

passport.use(new LocalStrategy({ usernameField: 'email' }, async function(username, password, done)  {
    try {
        const user = await UserModel.findOne({ email: username }).exec();

        if (!user) {
            return done(null, false, { message: 'Invalid username or password' });
        }
        const passwordOK = await user.comparePassword(password);
        if (!passwordOK) {
            return done(null, false, { message: 'Invalid username or password' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user,done)=>done(null, user._id));

passport.deserializeUser(async (id,done)=>{
    try {
        const user = await UserModel.findById(id).exec();
       // console.log(user);
        return done(null, user);
    } catch (err) {
        return done(err);
    }

});


module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
};
