var wafepaApp = angular.module("wafepaApp", ["ngRoute"]);

wafepaApp.controller("homeCtrl", function($scope){
	$scope.message = "Hello JWD!";
});


wafepaApp.controller("activitiesCtrl", function($scope, $http){
	
	var url = "/api/activities";
	
	$scope.activities = [];
	
	var getActivities = function(){
		
		var promise = $http.get(url);
		promise.then(
			function success(res){
				$scope.activities = res.data;
			},
			function error(res){
				alert("Could not fetch activities!");
			}
		);
		
		console.log("Poruka");	
	}
	
	getActivities();
	
	
});


wafepaApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			template : 
				`<div>
					<h1>{{message}}</h1>
				</div`,
			controller: 'homeCtrl'
		})
		.when('/activities', {
			templateUrl : '/app/html/activities.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);