const express=require("express");
const router=express();
const mongoose=require("mongoose")
const Story=mongoose.model('stories');
const User=mongoose.model('users');
const {isloggedIn}=require("../helpers/auth");
const moment=require('moment');


//Story Index
router.get('/', (req, res) => {
    Story.find({status:'public'})
      .populate('user')
      .sort({date:'desc'})
      .then(stories=> {
        res.render('stories/index', {
          stories: stories
        });
      });
  });

//Add Story
router.get("/add",isloggedIn,function(req,res){
    res.render("stories/add");
});

//Process add story
router.post("/",function(req,res){
  

   let allowComments;
   if(req.body.allowComments){
       allowComments=true;
   }else{
       allowComments=false;
   }

   const newStory={
       title:req.body.title,
       body:req.body.body,
       status:req.body.status,
       allowComments:allowComments,
       user:req.user.id
   }
   
   new Story(newStory)                  //create new story
   .save()
   .then(story=>{
       res.redirect(`/stories/show/${story.id}`)
   })

});

//Show story
router.get("/show/:id",function(req,res){
    Story.findOne({
        _id:req.params.id})
        .populate('user')
        .populate('comments.commentUser')
        .then(stories=>{
            if(stories.status=='public')
            {
                res.render("stories/show",{stories:stories,moment:moment})
            }else{
                if(req.user){
                    if(req.user.id==stories.user._id){
                        res.render("stories/show",{stories:stories,moment:moment})
                    }
                    else{
                        res.redirect("/stories")
                    }

                }else{
                    res.redirect("/stories")
                }
            }
        })
});

//Edit Story
router.get("/edit/:id",function(req,res){
    Story.findOne({
        _id:req.params.id
    })
    .then(stories=>{
        if(stories.user!=req.user.id){
            res.redirect("/stories")
        }
        else{
            res.render("stories/edit",{stories:stories});
        }
       
    })
    
})

//update
router.put("/:id",function(req,res){
    Story.findOne({
        _id:req.params.id
    })
    .then(stories=>{
        let allowComments;
   if(req.body.allowComments){
       allowComments=true;
   }else{
       allowComments=false;
   }
    
    stories.title=req.body.title,
    stories.status=req.body.status,
    stories.allowComments=allowComments,
    stories.body=req.body.body

    stories.save()
    .then(stories=>
        res.redirect("/dashboard"))
   })
});

//delete story
router.delete("/:id",function(req,res){
    Story.remove({_id:req.params.id})
    .then(()=>{
        res.redirect("/dashboard");
    }
    )
});

//Add comment
router.post("/comment/:id",function(req,res){
    Story.findOne({
        _id:req.params.id
    })
    .then(stories=>{
       const newComment={
        commentBody:req.body.commentBody,
        commentUser:req.user.id
 }
      //Add comments to array
      stories.comments.unshift(newComment);
      stories.save()
      .then(stories=>{
          res.redirect(`/stories/show/${stories.id}`)
      })
       

   }   )

});

//lIST STOREIES from a user

router.get("/user/:userId",function(req,res){
    Story.find({user:req.params.userId,status:'public'})
    .populate('user')
    .then(stories=>{
        res.render("stories/index",{stories:stories})
    })
})


//my stories
router.get("/my",isloggedIn,function(req,res){
    Story.find({user:req.user.id,status:'public'})
    .populate('user')
    .then(stories=>{
        res.render("stories/index",{stories:stories})
    })
})





module.exports=router;