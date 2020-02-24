const mongoose=require("mongoose");


const StorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'public'
    
    },
   allowComments:{
        type:Boolean,
        daefault:true
    },
    comments:[{
        commentBody:{
            type:String,
            required:true
        },
        commentDate:{
            type:Date,
            default:Date.now
        },
        commentUser:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    }],
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
     },
     date:{
         type:Date,
         default:Date.now
     }
});
mongoose.model("stories",StorySchema)