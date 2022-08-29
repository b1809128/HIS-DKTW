const express = require("express");
const router = express.Router();
const SupplierControllers = require("../controllers/SupplierControllers");

router.get("/", SupplierControllers.getSupplierController);
router.post("/post", SupplierControllers.createSupplierController);

module.exports = router;
