const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const date = new Date().toLocaleDateString;
const bcrypt = require("bcrypt");

const chatSchema = new Schema({
    username:[{
        fromUser: Boolean,
        msg: String
    }]
});

const userSchema = new Schema({

    username:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    chats: {
        type: chatSchema
    },
});

//Hash password before saving in DB

userSchema.pre("save", async function (next){
    try{
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    }
    catch(err){ 
        next(err);
    }
});

userSchema.methods.isValidPassword = async function(password){
    try{
       const match =  await bcrypt.compare(password, this.password);
       return match;
    }
    catch(err){
        throw new Error(err);
    }
}

const userModel =  mongoose.model("User", userSchema);
module.exports = userModel;