const express = require("express")
const router = express.Router({mergeParams:true})
const {createComment,loadComment,deleteComment}  = require("../handlers/comment")


//api/campground/:campId/comment

// api/campground/:campId/comment
router.route("/comment").get(loadComment).post(createComment)

// api/campground/:campId/comment/:commentId
router.route("/comment/:commentId").delete(deleteComment)


module.exports = router;