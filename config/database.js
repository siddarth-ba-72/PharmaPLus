const mongoose = require('mongoose');
const colors = require('colors');

const databaseConnection = () => {
	mongoose
		.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((data) => {
			console.log(`MongoDB Database connected: ${data.connection.host}`.blue.bold);
		});
};

module.exports = databaseConnection;
