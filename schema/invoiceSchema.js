const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
	invoiceNumber: {
		type: String,
		required: true
	},
	customerDetails: {
		name: {
			type: String,
			required: true
		},
		mobileNumber: {
			type: String,
			required: true
		},
	},
	invoiceDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	purchasedMedicines: [
		{
			name: {
				type: String,
				required: true
			},
			qty: {
				type: Number,
				required: true
			},
			price: {
				type: Number,
				required: true
			},
			medicine: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Medicine',
				required: true
			},
		}
	],
});

module.exports = mongoose.model('Invoice', invoiceSchema);
