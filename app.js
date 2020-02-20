const express=require("express");
const app= express();
const mongooose=require("mongoose");
const auth=require("./routes/auth");
const passport=require("passport");
const session=require("express-session");
const cookieParser=require("cookie-parser");
const index=require("./routes/index");
const path = require('path');

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


//Load User model
require("./models/User");

//passport config
require("./config/passport")(passport);

//configuring keys
const keys=require('./config/key');

//mongoose connection
mongooose.connect(keys.mongoURI,function(err){
    if(err){
        console.log(err);
    } else{
       console.log("mongo connected");}
    })
   

app.use(cookieParser());
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req,res,next)=>{
    res.locals.user=req.user|| null;
    next();
});


//Use routes
app.use('/auth',auth)
app.use('/',index)







app.listen(1234,function(){
    console.log(`Server has started`);
});