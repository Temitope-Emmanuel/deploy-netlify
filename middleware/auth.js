require("dotenv").config();

var jwt = require("jsonwebtoken");


exports.loginRequired = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY),function(err,decoded){
            if(decoded){
                console.log(decoded)
                next()
            }else{
                return next({
                    status:401,
                    message:"Please Login First"
                })
            }
        }
    }catch(e){
        return next({
            status:401,
            message:"Please Login Firxt"
        })
    }
}

exports.correctUser = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,function(err,decoded){
            if(decoded && decoded.id === req.params.userId){
                return next();
            }else{
                return next({
                    status:401,
                    message:"Unauthorized User"
                })
            }
        })
    }catch(e){
        return next({
            status:401,
            message:"You are not allowed to perform this actions"
        })
    }
}