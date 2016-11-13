define(['app','storage'],function(app,storage){
	app.controller('infinityCtrl',function($scope,Service,$rootScope){
		// 判读和读取本地存储数据
		if (storage.get('Infinity_Angular_Array')){
			$rootScope.todoList = storage.get('Infinity_Angular_Array');
		}
		else {
			$rootScope.todoList = [{
				"add":"https://www.alipay.com/",
				"wenZi":"支付宝",
				"color":"url(http://i4.buimg.com/573358/b38d1bf1c6ef661e.png)",
				"title":""
			},{
				"add":"http://instagram.com/",
				"wenZi":"instagram",
				"color":"url(http://i2.buimg.com/573358/6185c8edfbb6d99b.png)",
				"title":""
			},{
				"add":"http://www.ishadowsocks.com/",
				"wenZi":"影梭",
				"color":"url(http://i4.buimg.com/573358/0cd7b16132b1e691.png)",
				"title":""
			},{
				"add":"http://store.steampowered.com/",
				"wenZi":"steam",
				"color":"url(http://i4.buimg.com/573358/7fdac64522ae6b35.png)",
				"title":""
			},{
				"add":"http://wx.qq.com",
				"wenZi":"微信网页",
				"color":"url(http://i4.buimg.com/573358/57244219a184cf63.png)",
				"title":""
			},{
				"add":"http://music.163.com/",
				"wenZi":"网易云",
				"color":"url(http://i4.buimg.com/573358/9b3d92b8746de5f6.png)",
				"title":""
			}]
		    storage.set('Infinity_Angular_Array',$rootScope.todoList);
		}
		// 右键事件
		$scope.liNum = -1;
		$scope.rightClick = function($index){
			$scope.liNum = $index;			
		}		
		$scope.$on('$scopeliNum',function(e,data){
			$scope.liNum = data;
		})
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
	});	
})