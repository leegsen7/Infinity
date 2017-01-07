define(function(require){
	var app = require('app');
	var toastr = require('angular-toastr');
	var storage = require('storage');

	app.controller('changeCtrl',function($scope,Service,$rootScope,toastr){
		// 修改标签
		$scope.data = Service.data;
		$scope.changeBiaoqian = function(){
			$rootScope.todoList[Service.data.change_num].add = $scope.data.change_address;
			$rootScope.todoList[Service.data.change_num].wenZi = $scope.data.change_name;
			$scope.data.change_flag = true;
			storage.set('Infinity_Angular_Array',$rootScope.todoList);
			toastr.success('修改成功');
		}
		$scope.targetClick = function($event){
			if ($event.target == document.getElementsByClassName('change-bg')[0]){
				$scope.data.change_flag = true;
			}
		}	
	});
})