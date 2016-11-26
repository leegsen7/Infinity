define(['app','storage','config'],function(app,storage,config){
	app.controller('infinityCtrl',function($scope,Service,$rootScope){
		// 读取数据
		$rootScope.todoList = storage.get('Infinity_Angular_Array') || config.infinityList;

		// 右键事件
		$scope.liNum = -1;
		$scope.rightClick = function($index){
			$scope.liNum = $index;			
		}		
		// 接受广播
		$scope.$on('$scopeliNum',function(e,data){
			$scope.liNum = data;
		});
	    $scope.$on('giveFontColor',function(e,data){
	    	$scope.fontColor = data;
	    });		
		// 删除标签
		$scope.removeBiaoqian = function(x){
			$scope.liNum = -1;
			$rootScope.todoList.forEach(function(v,i,_){
				if (v == x){
					_.splice(i,1);
					// tipFadeOut('删除成功');
				}
			});
			storage.set('Infinity_Angular_Array',$rootScope.todoList);
		}
		// 编辑标签
		$scope.editBiaoqian = function(x,$index){
			Service.data.change_address = x.add;
			Service.data.change_name = x.wenZi;	
			Service.data.change_num = $index;
			Service.data.change_flag = false;
			$scope.liNum = -1;
		}	
		// 广播-收到json数据
		$scope.$on('giveSliderInfo',function(e,data){
			$scope.radiuNum = (data.radiu/2) + '%';
			$scope.opacityNum = data.opacity/100;
		})
	});	
})