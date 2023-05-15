const express = require('express');
const router = express.Router();
const {
	getAllInvoices,
	newInvoice,
	getInvoiceById,
	deleteInvoice
} = require('../controllers/invoiceController');

const {
	isAuthenticated,
	isAdmin
} = require('../middleware/authentication.js');

// ? GET All invoices
router.get('/all-invoice', isAuthenticated, getAllInvoices);

// ? POST Add new invoice
router.post('/new-invoice', isAuthenticated, newInvoice);

// ? GET Invoice by id
router.get('/invoice/:id', isAuthenticated, getInvoiceById);

// ? DELETE Invoice
router.delete('/invoice/:id', deleteInvoice);

module.exports = router;
