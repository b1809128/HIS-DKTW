const express = require("express");
const router = express.Router();
const ReceiptControllers = require("../controllers/ReceiptControllers");

router.get("/", ReceiptControllers.getReceiptController);
router.get("/:id", ReceiptControllers.getSingleReceiptController);
router.post("/post", ReceiptControllers.createReceiptController);

module.exports = router;
