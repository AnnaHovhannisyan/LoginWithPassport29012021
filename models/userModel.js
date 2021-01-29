const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const salt_round=10;


const UserSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique:true
    },
    password: {
        type: String,
        trim: true,
    },
    image:{
        type:String,
        default:'default_profile.png',
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails',
    }],
    friends: [{ type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    friendRequest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true });

UserSchema.pre('save', async function preSave(next){
    const user=this;
    try{
        if(!user.isModified("password")) next();

        let hash= await bcrypt.hash(user.password, salt_round);

        user.password=hash;

        next()
    }catch(err){
        next(err)
    }
});

UserSchema.methods.comparePassword=async function comparePassword(reqPass){

    return await bcrypt.compare(reqPass, this.password)

};

module.exports=mongoose.model('User', UserSchema);