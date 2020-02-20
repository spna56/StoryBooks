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
})
mongoose.model("users",UserSchema)