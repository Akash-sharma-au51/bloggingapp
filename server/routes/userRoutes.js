const {registerUser,loginUser,logoutUser} = require("../controller/userController")
const express = require('express')

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser)

module.exports = router