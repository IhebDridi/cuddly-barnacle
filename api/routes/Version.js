const express = require("express")
const checkAuth = require("../Middleware/Check-auth");
const VersionController = require("../Controllers/Versions")

const router = express.Router();

//router.get("/info")

router.post("/addNewVersion", VersionController.Add_New_Version)
router.post("/findOneVersion",VersionController.Find_One_Version)
//router.post("/AddNewVersion", ProjectController.Add_New_Version)

//router.patch("/info")

module.exports = router;