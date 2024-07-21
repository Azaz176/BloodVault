const router= require("express").Router()
const Inventory =require("../models/inventoryModel.js")
const User= require("../models/userModel.js")
const authMiddleware= require('../middlewares/authMiddleware.js')

// add inventory