require("dotenv").config()
const mongoose =  require("mongoose")
mongoose.set("debug",true);
mongoose.Promise = Promise;

// mongoose.connect(process.env.MONGODB_URI|| "mongodb://localhost/yelpcampv10",{
//     keepAlive:true,
//     // useUnifiedTopology:true,
//     // useNewUrlParser:true,
//     // useFindAndModify:true
// })

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI || yelpcampv10
const client = new MongoClient(process.env.MONGODB_URI || yelpcampv10, 
    { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



module.exports.Comment = require("./Comment")
module.exports.Campground = require("./Campground")
module.exports.User = require("./User")
