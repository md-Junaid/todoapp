var	mongoose = require('mongoose');
var	User 	 = mongoose.model('User');

module.exports.tasksGetAll = function(req, res) {
	console.log("Requested by: " + req.user);
	var userId = req.params.userId;
	User
		.findById(userId)
		.select('tasks')
		.exec(function(err, user) {
			if(err) {
				console.log("Error finding users");
			} else {
				console.log("Found user", user);
				res
					.json(user.tasks);
			}
		});
};

module.exports.tasksGetOne = function(req, res) {
	var userId = req.params.userId;
	var taskId = req.params.taskId;
	User
		.findById(userId)
		.select('tasks')
		.exec(function(err, user) {
			console.log("Returned task", user);
			var task = user.tasks.id(taskId);
			res
				.status(200)
				.json(task);
		});
};

var _addTask = function(req, res, user) {
	user.tasks.push({
		task : req.body.task
	});
	user.save(function(err, userUpdated) {
		if(err) {
			res
				.status(500)
				.json(err);
		} else {
			res
				.status(201)
				.json(userUpdated.tasks[userUpdated.tasks.length - 1]);
		}
	});
};

module.exports.tasksAddOne = function(req, res) {
	var userId = req.params.userId;
	User
		.findById(userId)
		.select('tasks')
		.exec(function(err, user) {
			var response = {
				status: 200,
				message: []
			}
			if(err) {
				console.log("Error finding users");
				response.status = 500;
				response.message = err;
			} else if(!user) {
				console.log("User not found in databse", userId);
				response.status = 404;
				response.message = {
					"message": "User Id not found " + userId
				}
			} 
			if(user) {
				_addTask(req, res, user);
			} else {
				res
					.status(response.status)
					.json(response.message);
			}
		});
};

module.exports.tasksUpdateOne = function(req, res) {
	var userId = req.params.userId;
	var taskId = req.params.taskId;

	User
		.findById(userId)
		.select('tasks')
		.exec(function(err, user) {
			var thisTask;
			var response = {
				status: 200,
				message: {}
			};
			if(err) {
				console.log("Error finding user");
				response.status = 500;
				response.message = err;
			} else if(!user) {
				console.log("User not found in database ", userId);
				response.status = 404;
				response.message = {
					"message": "User Id not found " + userId
				};
			} else {
				thisTask = user.tasks.id(taskId);
				if(!thisTask) {
					response.status = 404;
					response.message = {
						"message": "Task Id not found " + taskId
					};
				}
			}
			if(response.status !== 200) {
				res
					.status(response.status)
					.json(response.message);	
			} else {
				thisTask.task = req.body.task;

				user.save(function(err, userUpdated) {
					if(err) {
						res
							.status(500)
							.json(err);
					} else {
						res
							.status(204)
							.json();
					}
				});
			}
			
		});
};

module.exports.tasksDeleteOne = function(req, res) {
	var userId = req.params.userId;
	var taskId = req.params.taskId;
	
	User
		.findById(userId)
		.select('tasks')
		.exec(function(err, user) {
			var thisTask;
			var response = {
				status: 200,
				message: {}
			};
			if(err) {
				console.log("Error finding user");
				response.status = 500;
				response.message = err;
			} else if(!user) {
				console.log("User not found in database ", userId);
				response.status = 404;
				response.message = {
					"message": "User Id not found " + userId
				};
			} else {
				thisTask = user.tasks.id(taskId);
				if(!thisTask) {
					response.status = 404;
					response.message = {
						"message": "Task Id not found " + taskId
					};
				}
			}
			if(response.status !== 200) {
				res
					.status(response.status)
					.json(response.message);	
			} else {
				user.tasks.id(taskId).remove();

				user.save(function(err, userUpdated) {
					if(err) {
						res
							.status(500)
							.json(err);
					} else {
						res
							.status(204)
							.json();
					}
				});
			}
			
		});	
};