define(['app'],function(app){
	app.controller('bodyCtrl',function($scope){
		$scope.body = function(){
			$scope.$broadcast('$scopeliNum',-1);
		}
	})
})