const express = require('express');
const router = express.Router();
const UnitControllers = require('../controllers/UnitControllers')

router.get('/',UnitControllers.getUnitController)
router.post("/post",UnitControllers.createUnitController)

module.exports = router;