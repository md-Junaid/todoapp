angular.module('todoApp')
.directive('mhNavigation', mhNavigation);

function mhNavigation() {
	return {
		restrict: 'E',
		templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
	}
}