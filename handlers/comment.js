const db = require("../models")

exports.createComment = async function(req,res,next){
    try{
        let newComment = await db.Comment.create(req.body)
        const saveCampground = await db.Campground.findById(req.params.campId)
        saveCampground.comments.push(newComment._id)
        await saveCampground.save()
        const foundCampground = await db.Campground.findById(req.params.campId).populate("comments",{
            createdAt:true,
            user:true,
            content:true
        }).populate("user",{
            username:true,
            profileImgUrl:true
        }).exec()
        return res.status(200).json(foundCampground)
    }catch(e){
        return next(e)
    }
}

exports.loadComment = async function(req,res,next){
    try{
        console.log(`successfully reaching the laod comment orute`)
        const loadCampground = await db.Campground.findById(req.params.campId).populate("comments",{
            createdAt:true,
            user:true,
            content:true
        }).populate("user",{
            username:true,
            profileImgUrl:true,
            _id:0
        }).exec()
        return res.status(200).json(loadCampground)
    }catch(err){
        return next(err)
    }
}

exports.deleteComment = async function(req,res,next){
    try{
        let deletedComment = await db.Comment.findByIdAndRemove(req.params.commentId)
        // await deletedComment.remove()
        res.status(200).json(deletedComment._id)
    }catch(e){
        return next(e)
    }
}