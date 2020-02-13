const express=require("express");
const app= express();
const mongooose=require("mongoose");

app.get("/",function(req,res){
    res.send("hey there");
})





app.listen(1234,function(){
    console.log(`Server has started`);
})