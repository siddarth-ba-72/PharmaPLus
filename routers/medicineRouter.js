const express = require('express');
const router = express.Router();

const {
	getAllMedicinesDetails,
	addMedicine,
	addStockDetails,
	getMedicineDetails,
	getMedicineStockDetailsById,
	updateMedicineDetails,
	updateMedicineStockDetails,
	deleteMedicineDetails,
	deleteMedicineStockDetails
} = require('../controllers/medicineCRUDController.js');

// ? GET all medicines
router.get('/medicines', getAllMedicinesDetails);

// ? POST Add new medicine
router.post('/addmedicine', addMedicine);

// ? POST Add stock details
router.post('/addstockdetails/:id', addStockDetails);

// ? GET medicine by ID
router.get('/medicine/:id', getMedicineDetails);

// ? GET medicine stock details by ID
router.get('/medicinestock/:id', getMedicineStockDetailsById);

// ? PUT Update medicine details
router.put('/medicine/:id', updateMedicineDetails);

// ? PUT Update medicine stock details
router.put('/medicinestockdetails/:id', updateMedicineStockDetails);

// ? DELETE Medicine details
router.delete('/medicine/:id', deleteMedicineDetails);

// ? DELETE Medicine stock details
router.delete('/stock/:id', deleteMedicineStockDetails);


module.exports = router;
