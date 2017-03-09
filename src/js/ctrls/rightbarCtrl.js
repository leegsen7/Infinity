define(function(require){
	var Slider = require('slider');
	var app = require('app');
	var storage = require('storage');
	var config = require('config');
	var toastr = require('angular-toastr');

	var opacitySlider = new Slider('opacitySliderGrip','opacitySliderDiv','opacitySliderBar');
	var radiuSlider = new Slider('radiuSliderGrip','radiuSliderDiv','radiuSliderBar');	
	
	app.controller('rightbarCtrl',["$scope","$rootScope","toastr",function($scope,$rootScope,toastr){
		opacitySlider.init(function(e){
			$scope.opacitySliderNum = Math.floor(e);
			storage.set('Infinity_Angular_Info',{'opacity':$scope.opacitySliderNum,'radiu':$scope.radiuSliderNum});
			$scope.$emit('sendSliderInfo',{'opacity':$scope.opacitySliderNum,'radiu':$scope.radiuSliderNum});
		});
		radiuSlider.init(function(e){
			$scope.radiuSliderNum = Math.floor(e);			
			storage.set('Infinity_Angular_Info',{'opacity':$scope.opacitySliderNum,'radiu':$scope.radiuSliderNum});
			$scope.$emit('sendSliderInfo',{'opacity':$scope.opacitySliderNum,'radiu':$scope.radiuSliderNum});
		});
		var opacity = storage.get('Infinity_Angular_Info') ? storage.get('Infinity_Angular_Info').opacity : 90;
		var radiu = storage.get('Infinity_Angular_Info') ? storage.get('Infinity_Angular_Info').radiu : 50;
		opacitySlider.setSlider(opacity);
		radiuSlider.setSlider(radiu);
		$scope.opacitySliderNum = opacity;
		$scope.radiuSliderNum = radiu;
		$scope.$emit('sendSliderInfo',{'opacity':opacity,'radiu':radiu});
	
		// 获取瞄点
		var routeHash = window.location.hash;
		// 路由数组
		var hashArray = config.hashList;
		// 捕捉路由
		$scope.num = 0;
		for (i in hashArray){
			if (hashArray[i] == routeHash){
				$scope.num = i;
			}
		}			
		// 路由参数
		$scope.routeHashList = config.routeList;
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
			toastr.success('添加'+i.titleName+'标签成功');
		}
		// 自定义
		$scope.chooseColor = config.bgcolorList;
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
			toastr.success('添加'+$scope.name+'标签成功');	
		}	
		// 设置
		$scope.setColorList = config.fontcolorList;


		$scope.settingNum = storage.get('Infinity_Angular_Color') ? storage.get('Infinity_Angular_Color').num : 0;
		$scope.settingColor = storage.get('Infinity_Angular_Color') ? storage.get('Infinity_Angular_Color').color : '#fff';
		$scope.$emit('sentfootColor',$scope.settingColor);
		$scope.settingColor = function(x,$index){
			$scope.settingNum = $index;
			$scope.footColor = {
				'color':x,
				'num':$index,
			}
			$scope.$emit('sentfootColor',x);
			storage.set('Infinity_Angular_Color',$scope.footColor);			
		}

		// 输入键盘事件
	    $scope.keydown = function($event){
	    	// P和M键不响应
	    	if ($event.keyCode == 80 || $event.keyCode == 77){
	    		$event.stopPropagation();
	    	}	    	
	    }
	}])
})