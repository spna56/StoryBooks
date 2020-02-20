const express=require("express");
const router=express();
const passport=require("passport");


router.get("/google",passport.authenticate( "google",
{scope:['profile','email']})
);

router.get("/google/callback",
passport.authenticate("google",{failureRedirect:"/"}),function(req,res,err){
    if(err){
        console.log(err);
    }
    res.redirect("/dashboard");
}); 

router.get("/verify",function(req,res){
    if(req.user){
        console.log(req.user)
    }else{
        console.log("not auth");
    }
});

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});


module.exports=router;