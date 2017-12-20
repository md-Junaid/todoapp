angular.module('todoApp')
.controller('UsersController', UsersController);

function UsersController($http, $routeParams, $route, dataFactory, AuthFactory) {
	var vm = this;
	vm.title = 'MEAN Todo App';
	$http.get('/api/users/tasks').then(function(res){
		vm.tasks = res.data.tasks;
		id = res.data._id;
		console.log(res);
		var task = vm.task;
		vm.addTask = function() {

		var postData = {
			task: vm.task
		};
		if(vm.taskForm.$valid) {
			dataFactory.postTask(postData).then(function(response) {
				if(response.status === 201) {
					$route.reload();
				}
			}).catch(function(error) {
				console.log(error);
			});
		} else {
			vm.isSubmitted = true;
		}
	};

		vm.delTask = function(task) {
			var delData = task._id;
			console.log("delete task: ", delData);
			dataFactory.delTask(delData).then(function(res) {
				if(res.status === 204) {
					$route.reload()
				}
			}).catch(function(err) {
				console.log(err);
			});
		};
	});
}