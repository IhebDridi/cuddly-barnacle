const express = require("express")
const checkAuth = require("../Middleware/Check-auth");
const ModelController = require("../Controllers/Models")

const router = express.Router();

//router.get("/info")

router.post("/addNewModel", ModelController.Add_New_Model)
router.post("/ShowOneModel", ModelController.Show_One_Model)
router.put("/UpdateOneModelAnnotations", ModelController.Update_One_Model)
router.put("/UpdateOneModelContent", ModelController.Update_One_Model_Content)
//router.post("/AddNewVersion", ProjectController.Add_New_Version)

//router.patch("/info")

module.exports = router;