const express = require("express")
const checkAuth = require("../Middleware/Check-auth");
const profileController = require("../Controllers/Profile")


const router = express.Router();

//router.get("/info")

router.post("/info", profileController.Add_Profile_Data)

//router.patch("/info")

module.exports = router;