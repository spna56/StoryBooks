const express=require("express");
const router=express();

router.get("/",function(req,res){
    
    res.render("index/welcome");
});

router.get("/dashboard",function(req,res){

    res.send("dashboard");
})

module.exports=router;