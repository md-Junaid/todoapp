var express 	= require('express'),
	router		= express.Router(),
	ctrlTasks	= require('../controllers/tasks.controllers.js'),
	ctrlUsers	= require('../controllers/users.controllers.js');

router
	.route('/users/:userId/tasks')
	.get(ctrlUsers.authenticate, ctrlTasks.tasksGetAll)
	.post(ctrlTasks.tasksAddOne);

router
	.route('/users/:userId/tasks/:taskId')
	.get(ctrlTasks.tasksGetOne)
	.put(ctrlTasks.tasksUpdateOne)
	.delete(ctrlTasks.tasksDeleteOne);

//Authentication
router
	.route('/users/register')
	.post(ctrlUsers.register);

router
	.route('/users/login')
	.post(ctrlUsers.login);

module.exports = router;