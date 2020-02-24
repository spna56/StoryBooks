const express=require("express");
const router=express();
const mongoose=require("mongoose");
const {isloggedIn}=require("../helpers/auth");
const Story=mongoose.model('stories');
const moment=require('moment');

router.get("/",function(req,res){
    
    res.render("index/welcome");
});

router.get("/dashboard",isloggedIn,function(req,res){
    Story.find({user:req.user.id})
    .then(stories=>{
        res.render("index/dashboard",{stories:stories,moment:moment});
    })
        

   
})

router.get("/about",function(req,res){

    res.render("index/About");
})




module.exports=router;