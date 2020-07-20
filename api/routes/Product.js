const express = require("express");
const ProductsController = require("../Controllers/Product")
const checkAuth = require("../Middleware/Check-auth");
const router = express.Router();

router.post("/Product",checkAuth, ProductsController.Product_login_check)

module.exports = router;