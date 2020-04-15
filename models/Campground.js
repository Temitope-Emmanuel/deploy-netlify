const mongoose = require("mongoose")
const User = require("./User")
const Comment = require("./Comment")

const campgroundSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        unique:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments:[
          {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Comment"
        }   
    ],
    Date:{
        type:String,
        required:String
    }
})

campgroundSchema.pre("remove",async function(next){
    try{
        let foundUser = await this.db.User.findById(this.user)
        await foundUser.campground.remove(this.id)
        await foundUser.save();
        return next()
    }catch(e){
        return next(e)
    }
})

const Campground = mongoose.model("Campground",campgroundSchema)
module.exports = Campground