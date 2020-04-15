const db = require("../models")

async function findCampground(query,next){
    try{
        const foundDetail = await db.Campground.find({user:query})
        return foundDetail
    }catch(e){
        next(e)
    }
}

exports.loadAllCampground = async function(req,res,next){
    try{
        const allCampground = await db.Campground.find({},{comments:false}).populate("user",{
            username:1,
            profileImgUrl:1,
            _id:0
        }).exec()

        return res.status(200).json(allCampground)
    }catch(err){
        return next(err)
    }
}


exports.deleteCampground = async function(req,res,next){
    try{
        let foundCampground = await db.Campground.findByIdAndDelete(req.params.campId)
        console.log(`This is the deleted Campground`,foundCampground)
        return res.status(200).json(foundCampground)
    }catch(e){
        return next(e)
    }
}

exports.createCampground = async function(req,res,next){
    try{
        console.log(`reaching the create campground`,
              req.body,`And This is the user parasm`,req.params.userId)
        if(req.body.name){
            const newCampground = await db.Campground.create({
                ...req.body,
                user:req.params.userId
            });
            const foundUser = await db.User.findById(req.params.userId)
            foundUser.campground.push(newCampground._id)
            await foundUser.save();
            console.log(`This si the fpind user foundUser`,foundUser)
        }
        
        const foundCampground = await db.Campground.find({"user":req.params.userId},{comments:0,user:0});
        return res.status(200).json(foundCampground)
    }catch(err){
        if(err.code === 11000){
            err.message = "Sorry A Campground already has that name/location"
        }
        return next({
            status:400,
            message:err.message
        })
    }
}

exports.updateCampground = async function(req,res,next){
    try{
        console.log(`successfully reachin routes`)
        const updateCampground = await db.Campground.findByIdAndUpdate(req.params.campId,req.body)
        await updateCampground.save()
        const foundCampground = await findCampground(req.params.userId,next)
        console.log(`this is the updatedcampground`,updateCampground)
        return res.status(200).json(foundCampground.reverse())
    }catch(e){
        return next(e)
    }
}
