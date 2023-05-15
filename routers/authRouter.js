const express = require('express');
const router = express.Router();

const {
	createDataManager,
	authLogin,
	getDataManagers,
	getDataManagerById,
	authLogout,
	updateManager,
	deleteManager,
} = require('../controllers/authController.js');

const {
	isAuthenticated,
	isAdmin
} = require('../middleware/authentication.js');

// ? POST Create One data manager
router.post('/create-data-manager', createDataManager);

// ? POST Login
router.post('/login', authLogin);

// ? GET logout
router.get('/logout', isAuthenticated, authLogout);

// ? GET get all data managers
router.get('/get-data-managers', isAuthenticated, isAdmin, getDataManagers);

// ? GET get one data manager
router.get('/get-dm/:id', isAuthenticated, isAdmin, getDataManagerById);

// ? PUT Update Manager details
router.put('/update-dm/:id', updateManager);

// ? DELETE Delete Manager
router.delete('/delete-dm/:id', isAuthenticated, isAdmin, deleteManager);

module.exports = router;
