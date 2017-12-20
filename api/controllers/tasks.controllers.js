var	mongoose = require('mongoose'),
	User 	 = mongoose.model('User'),
	bcrypt	 = require('bcrypt-nodejs'),
	jwt		 = require('jsonwebtoken');

module.exports.tasksGetAll = function(req, res) {
	var headerExists = req.headers.authorization;
	if(headerExists) {
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, 's3cr3t', function(error, decoded) {
			if(error) {
				console.log(error);
				res
					.status(401)
					.json("Unauthorized");
			} else {
				req.user = decoded.username;
				// console.log("Found user: ", req.user );
				User
					.findOne({
						username: req.user
					}).exec(function(err, user){
						if(err) {
							console.log("Error finding User!");
							res
								.status(500)
								.json(err);
						} else {
							console.log("Found User: ", user);
							res
								.status(200)
								.json(user);
						}
					});
			}
		});
	}
};

// module.exports.tasksGetOne = function(req, res) {
// 	// var userId = req.params.userId;
// 	var taskId = req.params.taskId;
// 	User
// 		.findById(userId)
// 		.select('tasks')
// 		.exec(function(err, user) {
// 			console.log("Returned task", user);
// 			var task = user.tasks.id(taskId);
// 			res
// 				.status(200)
// 				.json(task);
// 		});
// };

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
var headerExists = req.headers.authorization;
	if(headerExists) {
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, 's3cr3t', function(error, decoded) {
			if(error) {
				console.log(error);
				res
					.status(401)
					.json("Unauthorized");
			} else {
				req.user = decoded.username;
				console.log("Found user: ", req.user );
				User
					.findOne({
						username: req.user
					}).exec(function(err, user){
						// console.log(user.id);
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
			}
		});
	}
};

module.exports.tasksUpdateOne = function(req, res) {
	var taskId = req.params.taskId;
	var headerExists = req.headers.authorization;
	if(headerExists) {
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, 's3cr3t', function(error, decoded) {
			if(error) {
				console.log(error);
				res
					.status(401)
					.json("Unauthorized");
			} else {
				req.user = decoded.username;
				console.log("Found user: ", req.user );
				User
					.findOne({
						username: req.user
					}).exec(function(err, user){
						// console.log(user.tasks);
						var thisTask;
						var userId = user.id;
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
			}
		});
	}
};

module.exports.tasksDeleteOne = function(req, res) {
	var taskId = req.params.taskId;
	var headerExists = req.headers.authorization;
	if(headerExists) {
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, 's3cr3t', function(error, decoded) {
			if(error) {
				console.log(error);
				res
					.status(401)
					.json("Unauthorized");
			} else {
				req.user = decoded.username;
				// console.log("Found user: ", req.user );
				User
					.findOne({
						username: req.user
					}).exec(function(err, user){
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
			}
		});
	}
};