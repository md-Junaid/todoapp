var mongoose	 = require('mongoose'),
	dburl		 = 'mongodb://junaid:password123@ds059546.mlab.com:59546/todo-app';
	// dburl		 = 'mongodb://localhost:27017/todos';

mongoose.connect(dburl);

mongoose.connection.on('connected', function() {
	console.log("Mongoose connected to " + dburl);
});

mongoose.connection.on('disconnected', function() {
	console.log("Mongoose disconnected");
});

mongoose.connection.on('error', function() {
	console.log("Mongoose connection error");
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected through app termination (SIGINT)");
		process.exit(0);
	});
});

process.on('SIGTERM', function() {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected through app termination (SIGTERM)");
		process.exit(0);
	});
});

process.on('SIGUSR2', function() {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected through app termination (SIGUSR2)");
		process.kill(process.pid, 'SIGUSR2');
	});
});

//Bring in schemas and models
require('./users.model');