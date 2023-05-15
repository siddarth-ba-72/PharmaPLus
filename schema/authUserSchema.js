const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authUserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		default: "datamanager",
	},
});

authUserSchema.methods.validatePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

authUserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
});

module.exports = mongoose.model('AuthUser', authUserSchema);
