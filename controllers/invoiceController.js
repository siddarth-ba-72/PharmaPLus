const Invoice = require('../schema/invoiceSchema.js');
const Medicine = require('../schema/medicineSchema.js');
const fast2sms = require('fast-two-sms')

// ? @desc: Get All Invoices
// ? @route: GET /invoiceapi/all-invoices
exports.getAllInvoices = async (req, res) => {
	try {
		const invoices = await Invoice.find({});
		return res.status(200).json({
			length: invoices.length,
			invoices
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
};

// ? @desc: New Invoice
// ? @route: POST /invoiceapi/new-invoice
exports.newInvoice = async (req, res) => {
	try {
		const {
			invoiceNumber,
			customerDetails,
			purchasedMedicines,
		} = req.body;
		for (let i = 0; i < purchasedMedicines.length; i++) {
			let medicine = await Medicine.findById(purchasedMedicines[i].medicine);
			if (!medicine)
				return res.status(404).json({
					success: false,
					message: 'Medicine not found'
				});
			if (medicine.stockDetails[0].inStock < purchasedMedicines[i].qty)
				return res.status(400).json({
					success: false,
					message: 'Medicine quantity not available'
				});
			if (medicine.stockDetails[0].expDate < (Date.now() + 30))
				return res.status(400).json({
					success: false,
					message: 'Medicine is about to expire'
				});
			medicine.stockDetails[0].inStock -= purchasedMedicines[i].qty;
			await medicine.save();
		}
		const allDetails = [];
		let sumtotal = 0;
		for (let i = 0; i < purchasedMedicines.length; i++) {
			allDetails.push(`${i + 1}. ${purchasedMedicines[i].name} : (${purchasedMedicines[i].qty}) : Rs.${purchasedMedicines[i].price}\n`);
			sumtotal += purchasedMedicines[i].price * purchasedMedicines[i].qty;
		}
		var options = {
			authorization: process.env.FAST_TWO_SMS_API,
			message: `PHARMA+\n\nHi ${customerDetails.name}\nYour invoice number is ${invoiceNumber}\n\n${allDetails.join('\n')}\n\nTotal: Rs.${sumtotal}\n\nThank you for shopping with us.`,
			numbers: [customerDetails.mobileNumber],
		};
		fast2sms.sendMessage(options);
		const newInvoice = new Invoice({
			invoiceNumber,
			customerDetails,
			purchasedMedicines
		});
		const invoice = await newInvoice.save();
		return res.status(200).json({
			invoice
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message
		});
	}
};

// ? @desc: Get Invoice By Id
// ? @route: GET /invoice/:id
exports.getInvoiceById = async (req, res) => {
	try {
		const invoice = await Invoice.findById(req.params.id);
		if (!invoice)
			return res.status(404).json({
				message: 'Invoice not found'
			});
		return res.status(200).json({
			invoice
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
};

// ? @desc: Delete Invoice
// ? @route: DELETE /invoice/:id
exports.deleteInvoice = async (req, res) => {
	try {
		const invoice = await Invoice.findById(req.params.id);
		if (!invoice)
			return res.status(404).json({
				message: 'Invoice not found'
			});
		await Invoice.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			message: 'Invoice deleted successfully'
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
};

