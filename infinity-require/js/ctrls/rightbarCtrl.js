define(['app','storage'],function(app,storage){
	app.controller('rightbarCtrl',function($scope,$rootScope){
		// 获取瞄点
		var routeHash = window.location.hash;
		// 路由数组
		var hashArray = ['#/','#/news','#/music','#/pic','#/shop','#/sport','#/blog','#/tec','#/game','#/edu'];	
		// 捕捉路由
		$scope.num = 0;
		for (i in hashArray){
			if (hashArray[i] == routeHash){
				$scope.num = i;
			}
		}			
		// 路由参数
		$scope.routeHashList = [{
			href:'#/',
			title:'应用与工具'
		},{
			href:'#/news',
			title:'新闻与阅读'
		},{
			href:'#/music',
			title:'音乐与视频'
		},{
			href:'#/pic',
			title:'图片与照片'
		},{
			href:'#/shop',
			title:'购物与团购'
		},{
			href:'#/sport',
			title:'体育与旅行'
		},{
			href:'#/blog',
			title:'社交与博客'
		},{
			href:'#/tec',
			title:'数码与科技'
		},{
			href:'#/game',
			title:'游戏与娱乐'
		},{
			href:'#/edu',
			title:'教育与招聘'
		}];	
		$scope.link = function($index){
			$scope.num = $index;
		}
		$scope.add = function(i){
			var x = {
				add:i.linkHref,
				wenZi:i.titleName,
				color:'url('+i.imgSrc+')',
				title:'',				
			}
			$rootScope.todoList.push(x);
			storage.set('Infinity_Angular_Array',$rootScope.todoList);
		}
		// 自定义
		$scope.chooseColor = ['#1ABC9C','#2ECC71','#33C5C5','#3498DB','#9B59B6','#34495E','#F1C40F','#E67E22','#E74C3C','#95A5A6','#39F076','#D80843'];	
		$scope.colorNum = 0;
		$scope.yulanColor = '#1ABC9C';
		$scope.selectColor = function($index,x){
			$scope.colorNum = $index;
			$scope.yulanColor = x;
		}
		$scope.addBiaoqian = function(){
			var x = {
				add:$scope.address,
				wenZi:$scope.name,
				color:$scope.yulanColor,
				title:$scope.name.substr(0,2),
			}
			$rootScope.todoList.push(x);
			$scope.name = $scope.address = '';
			storage.set('Infinity_Angular_Array',$rootScope.todoList);		
		}	
		// 设置
		$scope.setColorList = ['#FFF','#2ECC71','#33C5C5','#3498DB','#9B59B6','#34495E','#F1C40F','#E67E22','#E74C3C','#95A5A6','#39F076','#D80843'];
		if (storage.get('Infinity_Angular_Color')){
			$rootScope.rootColor = storage.get('Infinity_Angular_Color');
			$scope.settingNum = $rootScope.rootColor.num;
		}
		else {
			$scope.settingNum = 0;	
		}
		$scope.settingColor = function(x,$index){
			$scope.settingNum = $index;
			$rootScope.rootColor = {
				'color':x,
				'num':$index,
			}
			storage.set('Infinity_Angular_Color',$rootScope.rootColor);			
		}

	})
})