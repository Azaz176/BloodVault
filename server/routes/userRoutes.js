const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

// Register new user
router.post('/register', async (req, res) => {
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Save user
    const user = new User(req.body);
    await user.save();

    return res.send({
      success: true,
      message: "User registered successfully"
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message
    });
  }
});

//login
router.post('/login', async(req, res)=>{
  try {
    const user= await User.findOne({email:req.body.email})
    if(!user){
      return res.send({
        success:false,
        message:"User not found"
      })
    }

    //compare password
    const validPassword= await bcrypt.compare(
      req.body.password,
      user.password
    )
    if(!validPassword){
      return res.send({
        success:false,
        message:"Invalid Password"
      })
    }

    //generate token
    const token= jwt.sign({
      userId:user._id},
      process.env.jwt_secret,
    )

    return res.send({
      success:true,
      message:"User logged in successfully",
      data:token
    })
    
  } catch (error) {
    return res.send({
      success:false,
      message:error.message
    })
    
  }
})

//get current user
router.get("/get-current-user", async (req, res)=>{
  try {
    
  } catch (error) {
    res.send({
      success:false,
      message:error.message
    })
  }
})

module.exports = router;
