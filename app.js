const express=require("express");
const app= express();
const mongooose=require("mongoose");
const passport=require("passport");
const session=require("express-session");
const cookieParser=require("cookie-parser");
const path = require('path');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const methodOverride=require('method-override')



//Load  model
require("./models/User");
require("./models/Story");

//load routes 
const index=require("./routes/index");
const auth=require("./routes/auth");
const stories=require("./routes/stories");


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));




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
    });
//BodyParser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//methodoverride
app.use(methodOverride('_method'));

   

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
    res.locals.user=req.user;
    next();
});


//Use routes
app.use('/auth',auth);
app.use('/',index);
app.use('/stories',stories);








const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});