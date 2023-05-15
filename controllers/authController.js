const AuthUser = require('../schema/authUserSchema.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/tokenizer.js');

// ? @desc: Create Data manager
// ? @route: POST /authapi/create-data-manager
// ? @access: Admin
exports.createDataManager = async (req, res, next) => {
	try {
		const {
			username,
			password
		} = req.body;
		const dmExists = await AuthUser.findOne({ username });
		if (dmExists) {
			return res.status(400).json({
				message: 'Data manager already exists'
			});
		}
		const newDataManager = await AuthUser.create({
			username,
			password
		});
		if (newDataManager) {
			res.status(200).json({
				message: 'Data Manager created successfully',
				_id: newDataManager._id,
				username: newDataManager.username,
				role: newDataManager.role,
				token: generateToken(newDataManager._id)
			});
		}
	} catch (error) {
		res.status(500).json({
			message: 'Creating user failed'
		});
	}
};

// ? @desc: Login
// ? @route: POST /authapi/login
exports.authLogin = async (req, res, next) => {
	try {
		const {
			username,
			password
		} = req.body;
		if (!username || !password) {
			return res.status(401).json({
				message: 'Invalid credentials'
			});
		}
		const dataManager = await AuthUser.findOne({ username });
		if (dataManager && (await dataManager.validatePassword(password))) {
			res.status(200).json({
				message: 'Auth successful',
				_id: dataManager._id,
				username: dataManager.username,
				role: dataManager.role,
				token: generateToken(dataManager._id)
			});
		}
		else {
			res.status(401).json({
				message: 'Invalid credentials'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Invalid credentials'
		});
	}
}

// ? @desc: Logout
// ? @route: POST /authapi/logout
exports.authLogout = async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});
	res.status(200).json({
		message: "Logged Out",
	});
};

// ? @desc: Get all data managers
// ? @route: GET /authapi/get-data-managers
exports.getDataManagers = async (req, res, next) => {
	try {
		const dataManagers = await AuthUser.find({
			role: 'datamanager'
		});
		res.status(200).json({
			message: 'Data Managers retrieved successfully',
			dataManagers
		});
	} catch (error) {
		res.status(500).json({
			message: 'Retrieving data managers failed'
		});
	}
};

// ? @desc: Get Data Manager by ID
// ? @route: GET /authapi/get-dm/:id
// ? @access: Admin
exports.getDataManagerById = async (req, res, next) => {
	try {
		const dataManager = await AuthUser.findById(req.params.id);
		if (!dataManager) {
			return res.status(400).json({
				message: 'Data Manager does not exist'
			});
		}
		res.status(200).json({
			message: 'Data Manager retrieved successfully',
			dataManager
		});
	} catch (error) {
		res.status(500).json({
			message: 'Retrieving data manager failed'
		});
	}
};

// ? @desc: Update manager details
// ? @route: PUT /authapi/update-dm/:id
exports.updateManager = async (req, res, next) => {
	try {
		const {
			username,
			password
		} = req.body;
		let dataManager = await AuthUser.findById(req.params.id);
		if (!dataManager) {
			return res.status(400).json({
				message: 'Data Manager does not exist'
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		dataManager = await AuthUser.findByIdAndUpdate(req.params.id, {
			username,
			password: hashedPassword
		}, {
			new: true,
			runValidators: true,
			useFindAndModify: false,
		});
		await dataManager.save();
		res.status(200).json({
			message: 'Data Manager updated successfully',
			dataManager
		});
	} catch (error) {
		res.status(500).json({
			message: 'Updating user failed'
		});
	}
};

// ? @desc: Delete data manager
// ? @route: DELETE /authapi/delete-dm/:id
exports.deleteManager = async (req, res, next) => {
	try {
		const dataManager = await AuthUser.findById(req.params.id);
		if (!dataManager) {
			return res.status(400).json({
				message: 'Data Manager does not exist'
			});
		}
		if (dataManager.role === 'admin') {
			return res.status(400).json({
				message: 'Admin cannot be deleted'
			});
		}
		await AuthUser.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: 'Data Manager deleted successfully'
		});
	} catch (error) {
		res.status(500).json({
			message: 'Deleting data manager failed'
		});
	}
};
