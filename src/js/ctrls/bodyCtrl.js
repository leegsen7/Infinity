define(function(require){
	var app = require('app');

	app.controller('bodyCtrl',['$scope',function($scope){
		$scope.body = function(){
			// 向infinityCtrl传广播
			$scope.$broadcast('$scopeliNum',-1);
		}
		// rightbarCtrl设置字体 传播
		$scope.$on('sentfootColor',function(e,data){
			$scope.$broadcast('giveFontColor',data);
		});
		// rightbarCtrl设置圆角度数、透明度 传播
		$scope.$on('sendSliderInfo',function(e,data){
			$scope.$broadcast('giveSliderInfo',data);
		});
	}])
})