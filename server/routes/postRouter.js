const {createpost,findpostsbytitle,getallposts,updatedata,deleteddata} = require("../controller/postController")

const express = require("express")

const router = express.Router()


router.post("/create",createpost)
router.get("/findbytitle",findpostsbytitle)
router.get("/",getallposts)
router.put("/update",updatedata)
router.delete("/delete",deleteddata)

module.exports = router