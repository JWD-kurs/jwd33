var wafepaApp = angular.module("wafepaApp", ["ngRoute"]);

wafepaApp.controller("homeCtrl", function($scope){
	$scope.message = "Hello JWD!";
});


wafepaApp.controller("recordsCtrl", function($scope, $http){
	
	var recordsUrl = "/api/records";
	var usersUrl = "/api/users";
	var activitiesUrl = "/api/activities";
	
	$scope.records = [];
	$scope.users = [];
	$scope.activities = [];
	
	$scope.newRecord = {};
	$scope.newRecord.time = "";
	$scope.newRecord.duration = "";
	$scope.newRecord.intensity = "";
	$scope.newRecord.userId = "";
	$scope.newRecord.activityId = "";
	
	var getRecords = function(){
		$http.get(recordsUrl).then(
			function success(res){
				$scope.records = res.data;
			},
			function error(res){
				alert("Couldn't fetch records.");
			}
		);
	}
	getRecords();
	
	var getUsers = function(){
		$http.get(usersUrl).then(
			function success(res){
				$scope.users = res.data;
			},
			function error(){
				alert("Couldn't fetch users.");
			}
		);
	}
	getUsers();
	
	var getActivities = function(){
		$http.get(activitiesUrl).then(
			function success(res){
				$scope.activities = res.data;
			},
			function error(res){
				alert("Couldn't fetch users.");
			}
		);
	}
	getActivities();
	
	$scope.doAdd = function(){
		//console.log($scope.newRecord);
		$http.post(recordsUrl, $scope.newRecord).then(
			function success(){
				getRecords();
				
				$scope.newRecord.time = "";
				$scope.newRecord.duration = "";
				$scope.newRecord.intensity = "";
				$scope.newRecord.userId = "";
				$scope.newRecord.activityId = "";
			},
			function error(){
				alert("Couldn't add record.");
			}
		);
	}
	
});


wafepaApp.controller("activitiesCtrl", function($scope, $http, $location){
	
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
	
	$scope.goToEdit = function(id){
		//console.log(id);
		$location.path("/activities/edit/" + id);
	}
	
	$scope.goToAdd = function(){
		$location.path("/activities/add");
	}
	
	$scope.doDelete = function(id){
		
		var promise = $http.delete(url + "/" + id);
		promise.then(
			function success(res){
				getActivities();
			},
			function error(){
				alert("Couldn't delete activity.")
			}
		);
	}
	
});

wafepaApp.controller("editActivityCtrl", function($scope, $routeParams, $http, $location){
	
	//console.log($routeParams);
	var activityUrl = "/api/activities/" + $routeParams.aid;
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	var getActivity = function(){
		var promise = $http.get(activityUrl);
		promise.then(
			function uspeh(odg){
				//console.log(odg);
				$scope.activity = odg.data;
			},
			function neuspeh(odg){
				alert("Could not fetch activity.");
			}
		)
	}
	
	getActivity();
	
	$scope.edit = function(){
		$http.put(activityUrl, $scope.activity).then(
			function success(){
				$location.path("/activities");
			},
			function error(){
				alert("Couldn't edit activity.");
			}
		);
	}
	
});

wafepaApp.controller("addActivityCtrl", function($scope, $http, $location){
	
	var url = "/api/activities";
	
	$scope.newActivity = {};
	$scope.newActivity.name = "";
	
	$scope.add = function(){
		//console.log($scope.newActivity);
		
		$http.post(url, $scope.newActivity).then(
			function success(res){
				$location.path("/activities");
			},
			function error(res){
				alert("Could not add activity");
			}
		);
	}
	
});

wafepaApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			template : 
				`<div class="jumbotron">
					<h1>{{message}}</h1>
				</div`,
			controller: 'homeCtrl'
		})
		.when('/records', {
			templateUrl : '/app/html/records.html'
		})
		.when('/activities', {
			templateUrl : '/app/html/activities.html'
		})
		.when('/activities/add', {
			templateUrl : '/app/html/add-activity.html'
		})
		.when('/activities/edit/:aid', {
			templateUrl : '/app/html/edit-activity.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);