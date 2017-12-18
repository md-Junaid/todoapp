angular.module('todoApp')
.controller('UsersController', UsersController);

function UsersController($http, $routeParams) {
	var vm = this;
	vm.title = 'MEAN Todo App';
	var id = $routeParams.id;
	$http.get('/api/users/' + id + '/tasks').then(function(response) {
		console.log(response);
	});
}