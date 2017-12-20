angular.module('todoApp')
.factory('dataFactory', dataFactory);

function dataFactory($http) {
	return {
		postTask: postTask,
		delTask: delTask
	};

	// function hotelList() {
	// 	return $http.get('/api/hotels?count=12').then(complete).catch(failed);
	// }

	// function hotelDisplay(id) {
	// 	return $http.get('/api/hotels/' + id).then(complete).catch(failed);
	// }

	// function postReview(id, review) {
	// 	return $http.post('/api/users/' + id + '/reviews', review).then(complete).catch(failed);
	// }
	
	function postTask(task) {
		return $http.post('/api/users/tasks', task).then(complete).catch(failed);
	}
	function delTask(taskId) {
		return $http.delete('/api/users/tasks/' + taskId).then(complete).catch(failed);
	}

	function complete(response) {
		return response;
	}

	function failed(error) {
		console.log(error.statusText);
	}
}