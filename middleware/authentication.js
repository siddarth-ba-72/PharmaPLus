const jwt = require('jsonwebtoken');
const AuthUser = require('../schema/authUserSchema.js');

exports.isAuthenticated = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		const user = await AuthUser.findById(decoded.id);
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Invalid token'
			});
		}
		req.user = user;
		next();
	}
	catch (error) {
		res.status(500).json({
			success: false,
			message: 'Invalid token'
		});
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		if (req.user.role === 'admin') {
			next();
		}
		else {
			return res.status(401).json({
				message: 'Admin credentials required'
			});
		}
	}
	catch (error) {
		res.status(500).json({
			message: 'Invalid token'
		});
	}
};
