const mongoose=require("mongoose");


const UserSchema=new mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
    
    },
    lastName:{
        type:String
    },
    image:{
        type:String
    }
});

//Create Collection and add Schema
mongoose.model("users",UserSchema)