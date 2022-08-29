const express = require('express');
const router = express.Router();
const MedicalControllers = require('../controllers/MedicalControllers')

router.get('/',MedicalControllers.getMedicalController)
router.post("/post",MedicalControllers.createMedicalController)

module.exports = router;