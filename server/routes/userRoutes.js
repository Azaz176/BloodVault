const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const Inventory = require("../models/inventoryModel.js");
const mongoose = require("mongoose");

// Register new user
router.post("/register", async (req, res) => {
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists",
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
      message: "User registered successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }

    // check if userType is matching
    if (user.userType !== req.body.userType) {
      return res.send({
        success: false,
        message: `user is not registered as ${req.body.userType}`,
      });
    }

    //compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }

    //generate token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.jwt_secret
    );

    return res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//get current user
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    return res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all unique donors
router.get("/get-all-donors", authMiddleware, async (req, res) => {
  try {
    const organization= new mongoose.Types.ObjectId(req.body.userId)
    //get all unique donor ids from inventory
    const uniqueDonorIds = await Inventory.distinct("donor", {
      organization
    })

    const donors= await User.find({
      _id:{$in: uniqueDonorIds}
    })
    return res.send({
      success: true,
      message: "Donors fetched successfully",
      data: donors,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all unique hospitals
router.get("/get-all-hospitals", authMiddleware, async (req, res) => {
  try {
    const organization= new mongoose.Types.ObjectId(req.body.userId)
    //get all unique donor ids from inventory
    const uniqueHospitalIds = await Inventory.distinct("hospital", {
      organization
    })

    const hospitals= await User.find({
      _id:{$in: uniqueHospitalIds}
    })
    return res.send({
      success: true,
      message: "Hospitals fetched successfully",
      data: hospitals,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
