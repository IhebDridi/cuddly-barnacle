const express = require("express");
const UsersController = require("../Controllers/User")
const checkAuth = require("../Middleware/Check-auth");

const router = express.Router();

router.get("/GetAllUsers",UsersController.Get_All_Users);

router.get("/:userId",UsersController.Get_One_User)

router.post("/SignUp",UsersController.SignUp)

router.post("/Login", UsersController.Login)

router.delete("/:userId",checkAuth, UsersController.delete_User)


module.exports = router;