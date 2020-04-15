const mongoose = require("mongoose")
const Campground = require("../models/Campground")


const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        username:"String",
        profileImage:"String"
    }
    ,
    campground:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Campground"
    },
    Date:{
        type:String,
        required:true
    }
})


commentSchema.pre("remove",async function(next){
    try{
        const foundCampground = await Campground.findById(this.campground)
        foundCampground.comment.remove(this._id);
        await foundCampground.save()
        return next()
    }catch(e){
        return next(e)
    }
})

const Comment = mongoose.model("Comment",commentSchema)
module.exports = Comment