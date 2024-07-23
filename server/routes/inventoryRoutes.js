const router = require("express").Router();
const Inventory = require("../models/inventoryModel.js");
const User = require("../models/userModel.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const mongoose = require("mongoose");

// Add inventory
router.post("/add", authMiddleware, async (req, res) => {
  try {
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
      //check if inventory is available
      const requestedGroup = req.body.bloodGroup;
      const requestedQuantity = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);

      const totalInOfRequestedGroup = await Inventory.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInOfRequestedGroup[0].total || 0;
      const totalOutOfRequestedGroup = await Inventory.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalOut = totalOutOfRequestedGroup[0]?.total || 0;

      const availableQuantityOfRequestedGroup = totalIn - totalOut;

      if (availableQuantityOfRequestedGroup < requestedQuantity) {
        throw new Error(
          `only ${availableQuantityOfRequestedGroup} units of ${(requestedGroup).toUpperCase()} is available`
        );
      }
      req.body.hospital = user._id;
    } else {
      req.body.donor = user._id;
    }

    // Add inventory
    const inventory = new Inventory(req.body);
    await inventory.save();
    return res.send({ success: true, message: "Inventory added successfully" });
  } catch (error) {
    // console.log(error);

    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// get Inventory
router.get("/get", authMiddleware, async (req, res) => {
  try {
    const inventory = await Inventory.find({ organization: req.body.userId }).sort({createdAt: -1})
      .populate("donor")
      .populate("hospital");
    //console.log(inventory)
    return res.send({
      success: true,
      data: inventory,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/filter", authMiddleware, async (req, res) => {
  try {
    const filters = req.body.filters;
    //console.log('Received filters:', filters);
    const inventory = await Inventory.find(filters).limit(req.body.limit || 10).sort({createdAt: -1})
      .populate("donor")
      .populate("hospital")
      .populate("organization");
    //console.log(inventory)
    return res.send({
      success: true,
      data: inventory,
    });
  } catch (error) {
    //console.error('Error fetching inventory data:', error);
    return res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
