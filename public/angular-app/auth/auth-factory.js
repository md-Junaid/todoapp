angular.module('todoApp')
.factory('AuthFactory', AuthFactory);


function AuthFactory() {
	return {
		auth: auth
	};

	var auth = {
		isLoggedIn: false
	};
}