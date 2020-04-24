require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const serverless = require("serverless-http")

const errHandler = require("../handlers/error")
const authRoutes = require("../routes/auth.js")
const campgroundRoutes = require("../routes/campgrounds")
const commentRoutes = require("../routes/comment")
const campgroundHandler = require("../handlers/campground")

app.use(cors())
app.use(bodyParser.json())

app.use("/.netlify/functions/api/auth/",authRoutes)
app.use("/.netlify/functions/api/user/:userId/campground",campgroundRoutes)
app.use("/.netlify/functions/api/campground/:campId",commentRoutes)

app.get("/.netlify/functions/api",campgroundHandler.loadAllCampground)


app.use(function(req,res,next){
    let err = new Error("Not Found!!! :(")
    err.status = 400
    next(err)
})


app.use(errHandler)




// app.use('/.netlify/functions/api',router)
module.exports = app
module.exports.handler = serverless(app)