var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	task: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		"default": Date.now
	}
});

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	tasks: [taskSchema]
});

mongoose.model('User', userSchema);