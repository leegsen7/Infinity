


// 操作提示函数
function tipFadeOut(str){
	if (document.getElementById('changeTip')){
		clearTimeout(st);
		$('#changeTip').remove();
	}
	$('body').append('<div id="changeTip"></div>');
	$("#changeTip").addClass('change-tip').text(str);
	var st = setTimeout(function(){
		$("#changeTip").remove();
	},3000);		
}
// 展示标签li函数
function ShowImg(index){
    var adWidth=$(".infinity .infinity_li").width();
    $(".infinity").stop(true,false).animate({
        "marginLeft":-adWidth*index+"px"
    },1000);
    $("#num li").removeClass("on").eq(index).addClass("on");
}
// 点击翻页事件
var fanyeEvent = function(){
	$("#num li").click(function(){
	    var index=$("#num li").index(this);
	    ShowImg(index);
	});	
}
// 一页标签函数
var subPage = function(){
	$('#num').css('display','none');
	$('.infinity_li').first().siblings().remove();
	$('#num li').first().siblings().remove();
}
// 两页标签函数
var addPage = function(){
	$('#num').css('display','inline-block');
	$('#num').append('<li></li>');
}
// angular对象
var app = angular.module('myApp', ['ngRoute']);
// 构造本地存储函数
app.factory('locals',['$window',function($window){
	return {
		set: function(key,value){
			$window.localStorage[key] = value;
		},
		get: function(key){
			return $window.localStorage[key];
		},
		getObject: function(key){
			return JSON.parse($window.localStorage[key]);
		}
	}
}]);
// myCtrl控制器
app.controller('myCtrl', function($scope,locals,$interval,$compile){
	// 颜色选项repeat
	$scope.fontColorList = [{},{},{},{},{},{}];
	// 判读和读取本地存储数据
	if (locals.get('Infinity_Angular_Array')){
		$scope.todoList = locals.getObject('Infinity_Angular_Array');
	}
	else {
		$scope.todoList = [{
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
	    locals.set('Infinity_Angular_Array',angular.toJson($scope.todoList));
	}

	// 添加标签
	$scope.addBiaoqian = function(){
		var selectColor = $('#yulan-back').css('backgroundColor');
		var scopeTitle = $('#name').val().substr(0,2);
		var scopeRadius = $('#yulan-back').css('border-radius');
		var scopeOpacity = $('#yulan-back').css('opacity');
		$scope.todoList.push({
			add:$scope.address,
			wenZi:$scope.name,
			color:selectColor,
			title:scopeTitle,
			radius:scopeRadius,
			opacity:scopeOpacity
		});
		tipFadeOut('添加成功');
		locals.set('Infinity_Angular_Array',angular.toJson($scope.todoList));
		$scope.address =  $scope.name = '';
		$('#address').focus();
	}

	// 删除标签
	$scope.removeBiaoqian = function(x){
		$scope.todoList.forEach(function(v,i,_){
			if (v == x){
				_.splice(i,1);
				tipFadeOut('删除成功');
			}
		});
		locals.set('Infinity_Angular_Array',angular.toJson($scope.todoList));
	}

	// 修改编辑标签
	$scope.editBiaoqian = function(x){
		$('#bg_change').fadeIn('800',function(){
			$(document).click(function(){
				var theEvent = window.event || arguments.callee.caller.arguments[0];
				var obj = theEvent.srcElement ? theEvent.srcElement : theEvent.target;
				if (obj.id == 'bg_change'){
					$('#bg_change').fadeOut(800);
				}
			})				
		});
		$scope.change_address = x.add;
		$scope.change_name = x.wenZi;

		$scope.changeBiaoqian = function(){
			x.add = $scope.change_address;
			x.wenZi = $scope.change_name;
			locals.set('Infinity_Angular_Array',angular.toJson($scope.todoList));
			$('#bg_change').fadeOut(800,function(){
				tipFadeOut('修改成功');
			});
		}
	}
	// 监控标签
	$interval(function(){
		$scope.listLength = ($scope.todoList.length-1)/10;
	},500);	
	$scope.$watch('listLength',function(newValue,oldValue,scope){
		if (Math.floor(newValue) == 0){
			// 删除一页
			subPage();
			ShowImg(0);
			$scope.todoList1 = $scope.todoList;
		}
		if (Math.floor(newValue) == 1){
			$scope.todoList1 = $scope.todoList.slice(0,10);
			$scope.todoList2 = $scope.todoList.slice(10);
			// 两页初始化
			if (Math.floor(newValue) == 1 && oldValue == undefined){
				addPage();
				fanyeEvent();
				compileDirective();
			}
			// 两页添加标签
			if (newValue > 1 && oldValue >= 1){
				ShowImg(1);
			}
			// 从一页到两页
			if (newValue == 1 && oldValue == 0.9){
				addPage();
				fanyeEvent();
				compileDirective();
				ShowImg(1);
			}
		}
		if (newValue == 2 && oldValue == 1.9){
			$scope.todoList.pop();
			locals.set('Infinity_Angular_Array',angular.toJson($scope.todoList));
			tipFadeOut('最多20个标签');
		}
	});
	// 动态加载指令和编译
	var compileDirective = function (){
		var html = angular.element('<infinity-li-two></infinity-li-two>');
		var compileHtml = $compile(html)($scope);
		angular.element('.infinity').append(compileHtml);
	}
});

// 过滤器
app.filter('searchFor',function(){
    return function(arr, searchString){  
        if(!searchString){  
            return arr;
        }  
        var result = [];  
        searchString = searchString.toLowerCase();  
        angular.forEach(arr, function(item){  
            if(item.titleName.toLowerCase().indexOf(searchString) !== -1){  
                result.push(item);  
            }  
        });  
        return result;  
    };  
})
// 分页标签指令
app.directive('infinityLi',function(){
	return {
		restrict: "EA",
		replace: true,
		template: "<li class='infinity_li'>"+
			"<ul id='sortable'>"+
				"<li ng-repeat='x in todoList1' class='mainCenterLi' dragable='true'>"+
					"<a href='{{x.add}}' target='_blank'>"+
						"<div class='biaoLogo centered' style='background:{{x.color}};'>"+
							"{{x.title}}"+
						"</div>"+
						"<div class='wenZi centered' ng-bind='x.wenZi'></div>"+
					"</a>"+
					"<div class='editIco' ng-click='editBiaoqian(x)' title='删除标签'></div>"+
					"<div class='removeIco' ng-click='removeBiaoqian(x)' title='编辑标签'></div>"+
				"</li>"+
			"</ul>"+
		"</li>",
	}
})
// 二页
app.directive('infinityLiTwo',function(){
	return {
		restrict: "EA",
		replace: true,
		template: "<li class='infinity_li'>"+
			"<ul id='sortable'>"+
				"<li ng-repeat='x in todoList2' class='mainCenterLi' dragable='true'>"+
					"<a href='{{x.add}}' target='_blank'>"+
						"<div class='biaoLogo centered' style='background:{{x.color}};'>"+
							"{{x.title}}"+
						"</div>"+
						"<div class='wenZi centered' ng-bind='x.wenZi'></div>"+
					"</a>"+
					"<div class='editIco' ng-click='editBiaoqian(x)' title='删除标签'></div>"+
					"<div class='removeIco' ng-click='removeBiaoqian(x)' title='编辑标签'></div>"+
				"</li>"+
			"</ul>"+
		"</li>",
	}
})

