const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const Inventory = require("../models/inventoryModel.js");
const mongoose = require("mongoose");

// get all blood groups totalIn, totalOut, available data from inventory collection
router.get("/blood-groups-data", authMiddleware, async (req, res) => {
  try {
    const allBloodGroups = ["a+", "a-", "b+", "b-", "o+", "o-", "ab+", "ab-"];
    const bloodGroupsData = [];
    const organization = new mongoose.Types.ObjectId(req.body.userId);

    await Promise.all(
      allBloodGroups.map(async (bloodGroup) => {
        const totalIn = await Inventory.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$quantity",
              },
            },
          },
        ]);

        const totalOut = await Inventory.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$quantity",
              },
            },
          },
        ]);

        const available = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
        bloodGroupsData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          available,
        });
      })
    );

    res.send({
      success: true,
      message: "Blood Groups Data",
      data: bloodGroupsData,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
