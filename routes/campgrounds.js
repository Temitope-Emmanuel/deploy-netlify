const express  = require("express")
const router = express.Router({mergeParams:true})
const {createCampground,updateCampground,deleteCampground} = require("../handlers/campground")

// api/user/:userId/campground/
router.route("/").get(createCampground).post(createCampground)

// api/user/:userId/campground/:campId
router.route("/:campId").put(updateCampground).delete(deleteCampground)


module.exports = router