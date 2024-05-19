const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  try {
    //checking for existing user
    const { fullname, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        message: "user already exists",
        success: false,
      });
    }
    //hash password

    const hashedpassword = await bcrypt.hash(password, 16);
    await User.create({
      fullname,
      email,
      password: hashedpassword,
    });
    // success registration
    res.status(200).json({
      message: "user created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = User.findOne({ email });
    if (!user) {
      res.ststus(400).json({
        message: "invalid user",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: "invalid email or password",
        success: false,
      });
      //login success

      const tokenData = {
        id: user._id,
      };
      const secretkey = crypto.randomBytes(32).toString("hex");
      const token = jwt.sign(tokenData, secretkey, { expiresIn: "1h" });
      res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json({
          message: `welcome back ${user.fullname}`,
          success: true,
        });
    } else {
      res.status;
    }
  } catch (error) {
    res.status(500).json({
        message:"internal server error",
        success:false
    })
  }
};

const logoutUser = async(req,res)=>{
    try {
        res.status(200).clearCookie("token").json({
            message:"logged out success",
            success:true
        })
        
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false   
        })
        
    }
}

module.exports = {registerUser,loginUser,logoutUser}
