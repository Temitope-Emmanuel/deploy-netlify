require("dotenv").config()
const mongoose =  require("mongoose")

mongoose.connect(process.env.MONGODB_URI|| "mongodb://localhost/yelpcampv10",{
    keepAlive:true,
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:true
})



module.exports.Comment = require("./Comment")
module.exports.Campground = require("./Campground")
module.exports.User = require("./User")
