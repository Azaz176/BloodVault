const router = require("express").Router();
const Inventory = require("../models/inventoryModel.js");
const User = require("../models/userModel.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

// Add inventory
router.post("/add", authMiddleware, async (req, res) => {
  try {
    // Log the entire request body
    console.log("Request Body:", req.body);

    // Validate email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Invalid email");
    }

    // Validate inventoryType and userType
    if (req.body.inventoryType === "in" && user.userType !== "donor") {
      throw new Error("This email is not registered as a donor");
    }

    if (req.body.inventoryType === "out" && user.userType !== "hospital") {
      throw new Error("This email is not registered as a hospital");
    }

    // Set hospital or donor based on inventoryType
    if (req.body.inventoryType === "out") {
      req.body.hospital = user._id;
    } else {
      req.body.donor = user._id;
    }

    // Log the modified request body before saving
    console.log("Modified Request Body:", req.body);

    // Add inventory
    const inventory = new Inventory(req.body);
    await inventory.save();
    return res.send({ success: true, message: "Inventory added successfully" });
  } catch (error) {
    console.log(error);

    return res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
