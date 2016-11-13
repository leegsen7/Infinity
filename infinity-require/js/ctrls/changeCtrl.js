define(['app'],function(app){
	app.controller('changeCtrl',function($scope,Service,$rootScope){
		// 修改标签
		$scope.data = Service.data;
		$scope.changeBiaoqian = function(){
			$rootScope.todoList[Service.data.change_num].add = $scope.data.change_address;
			$rootScope.todoList[Service.data.change_num].wenZi = $scope.data.change_name;
			$scope.data.change_flag = true;
		}
		$scope.targetClick = function($event){
			if ($event.target == document.getElementsByClassName('change-bg')[0]){
				$scope.data.change_flag = true;
			}
		}	
	});
})