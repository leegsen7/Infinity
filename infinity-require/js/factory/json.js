define(['app'],function(app){
	app.factory('getJson',function($http,$scope){
		$http.get('./config.json').success(function(data){
			$scope.data = data;
		});
		return $scope.data;
	})
})