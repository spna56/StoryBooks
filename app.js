const express=require("express");
const app= express();
const mongooose=require("mongoose");
const auth=require("./routes/auth");
const passport=require("passport");



//passport config
require("./config/passport")(passport);

app.get("/",function(req,res){
    res.send("hey there");
})



app.use('/auth',auth)

app.listen(1234,function(){
    console.log(`Server has started`);
});