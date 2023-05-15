const jwt = require('jsonwebtoken');

exports.generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
		expiresIn: '15d'
	});
};
