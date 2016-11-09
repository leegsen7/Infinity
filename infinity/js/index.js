// 更换背景图函数
function changeBackground(){
	// $('#backgroundImg').fadeOut(500);
	var randomnum = Math.floor(Math.random()*20+1);
	var randomSrc = 'img/beijing'+randomnum+'.png';
	var img = new window.Image();
	img.src = randomSrc;

	$('#backgroundImg').css({
		'background-image':"url("+randomSrc+")",
	}).hide().fadeIn(1500);
}

$(function(){
	// 获取瞄点
	var routeHash = window.location.hash;
	// 路由数组
	var hashArray = ['#/','#/news','#/music','#/pic','#/shop','#/sport','#/blog','#/tec','#/game','#/edu'];

	// 标签放大动画
	$('#mainCenter').addClass('zoomed');	

	// 设置开始随机背景图
	var a = Math.floor(Math.random()*20+1);
	var firstSrc = 'img/beijing'+a+'.png';
	// alert(firstSrc);
	$('#backgroundImg').css('background-image',"url("+ firstSrc +")");
	// 点击更换背景图
	$('#fengche').click(function(){	
		// var randomnum = Math.floor(Math.random()*3);
		// var randomSrc = 'img/'+array[randomnum];	
		$(this).rotate({
			duration:1000,
			angle:0,
        	animateTo:360,
        	callback:changeBackground
		});
	});
	// 点击功能按钮
	var flag = true;
	$('#addButton').click(function(){
		if (flag){
			$(this).rotate({
				duration:1500,
				angle:0,
	        	animateTo:405
			});
			$('#rightBar').animate({
				right:'0px',
			},1000);
		}
		else {
			$(this).rotate({
				duration:1500,
				angle:405,
	        	animateTo:810
			});
			$('#rightBar').animate({
				right:'-350px',
			},1000);
		}
		flag = !flag;
	});

	// 搜索按钮的隐藏和显示
	$(document).click(function(){
		var theEvent = window.event || arguments.callee.caller.arguments[0];
		var obj = theEvent.srcElement ? theEvent.srcElement : theEvent.target;
		obj.id == "btss" ? $("#searchInput .righted").show() : $("#searchInput .righted").hide();
	})

	document.getElementById('btss').onfocus=function(){
		$(document).keydown(function(e){
			if (e.keyCode == 13){
				$('#searchInput .righted').click();
			}
		})
	}

	// 搜索
	$('#searchInput .righted').click(function(){
		search();
	})

	// 搜索功能切换
	$('#searchBar li').click(function(){
		$(this).css('borderBottom','2px solid #2ECC71').siblings().css('borderBottom','0');
		$('#btss').attr('url',$(this).attr('url'));
	})
	// 搜索函数
	function search(){
		var a = $("#btss").val();
		function jsonValue(num,val){
			var searchJson = [{
				'page':'https://www.google.com/search?q=',
				'image':'https://www.google.com/search?tbm=isch&q=',
				'map':'https://www.google.com/maps/preview?q=',
				'video':'https://www.google.com/search?tbm=vid&q=',
				'news':'https://www.google.com/search?tbm=nws&q='
			},{
				'page':'https://www.baidu.com/s?ie=UTF-8&wd=',
				'image':'http://image.baidu.com/search/index?tn=baiduimage&word=',
				'map':'http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D',
				'video':'http://video.baidu.com/v?ie=utf-8&word=',
				'news':'http://news.baidu.com/ns?tn=news&ie=utf-8&word='				
			}];
			return searchJson[num][val];
		}
		var typeValue = $('#btss').attr('url');
		var searchValue = localStorage.getItem('Infinity_Angular_Search');
		var url = jsonValue(searchValue,typeValue) + a;
		window.location.href = url;
	}
	// 实现百度和Google搜索功能切换
	(function(){
		// 读取本地数据
		var searchValue = localStorage.getItem('Infinity_Angular_Search');
		if (searchValue == 0){
			google();
		}
		else{
			baidu();
		}
	})();
	$('.select-search-li').click(function(){
		var index = $(this).index();
		if (index == 1){
			baidu();
			localStorage.setItem('Infinity_Angular_Search',1);
		}
		else if (index == 2){
			google();
			localStorage.setItem('Infinity_Angular_Search',0);
		}
	})
	function baidu(){
		$('#selectSearch').css('backgroundPositionX','-40px');
		$('#btss').attr('placeholder','百度一下，你就知道');		
	}
	function google(){
		$('#selectSearch').css('backgroundPositionX','0');
		$('#btss').attr('placeholder','Google 搜索');
	}
	// 功能栏切换
	$('.select-two').click(function(){
		$(this).addClass("borderBottom");
		$('.select-one').removeClass('borderBottom');
		$('#xiangmu').hide();
		$('#setting').show();
	})
	$('.select-one').click(function(){
		$(this).addClass("borderBottom");
		$('.select-two').removeClass('borderBottom');
		$('#xiangmu').show();
		$('#setting').hide();
	})
	$('#xiangmuBar .lefted').click(function(){
		$(this).addClass("greenColor");
		$('#xiangmuBar .righted').removeClass('greenColor');
		$('#xiangmuMain-tj').show();
		$('#xiangmuMain-zdy').hide();		

	})
	$('#xiangmuBar .righted').click(function(){
		$(this).addClass("greenColor");
		$('#xiangmuBar .lefted').removeClass('greenColor');
		$('#xiangmuMain-tj').hide();
		$('#xiangmuMain-zdy').show();
	})

	// 图标颜色选择
	$('.icobgColor').click(function(){
		$(this).css({
			'visibility':'visible',
			'opacity':'1'
		}).siblings().css({
			'visibility':'hidden',
			'opacity':'.5'
		});
		var targetBgC = $(this).css('backgroundColor');
		$('#yulan-back').css('backgroundColor',targetBgC);
	})

	// 字体颜色选择
	if (localStorage.getItem('fontColor')){
		var fontColor = JSON.parse(localStorage.getItem('fontColor'));
		$('.wenZi,#searchBar li').css('color',fontColor.color);
		$('.fontColor:nth-child('+fontColor.num+')').addClass('fontColor-li-on');
	}
	else{
		$('.fontColor:nth-child(1)').addClass('fontColor-li-on');
	}
	$('.fontColor').click(function(){
		$(this).addClass('fontColor-li-on').siblings().removeClass('fontColor-li-on');		
		var targetBgC = $(this).css('backgroundColor');
		$('.wenZi,#searchBar li').css('color',targetBgC);
		var fontColor = {color:targetBgC,num:$(this).index()+1};
		localStorage.setItem('fontColor',JSON.stringify(fontColor));
	});		

	// 设置初始标签圆角和透明度
	if (!localStorage.getItem('Infinity_Angular_Json')){
		$('.nstSlider-one,.nstSlider-two').attr('data-cur_min','100');
		var Infinity_Angular_Json = {opacity:100,radius:100};
		localStorage.setItem('Infinity_Angular_Json',JSON.stringify(Infinity_Angular_Json));
		nst_one();
		nst_two();
	}
	else {
		var myStorage = JSON.parse(localStorage.getItem('Infinity_Angular_Json'));
		$('.nstSlider-one').attr('data-cur_min',myStorage.opacity);
		$('.nstSlider-two').attr('data-cur_min',myStorage.radius);
		nst_one();
		nst_two();
	}
	// 图标不透明度滑动条函数
	function nst_one(){
		$('.nstSlider-one').nstSlider({
		    "left_grip_selector": ".leftGrip-one",
		    "value_bar_selector": ".bar-one",
		    "value_changed_callback": function(cause, leftValue, rightValue) {
		    	var myStorage = JSON.parse(localStorage.getItem('Infinity_Angular_Json'));
		    	myStorage.opacity = leftValue;
		    	localStorage.setItem('Infinity_Angular_Json',JSON.stringify(myStorage));
		        $(this).parent().find('.leftLabel-one').text(leftValue+'%');
		        $('.biaoLogo,#yulan-back').css('opacity',leftValue/100);
		    }
		});
	}	
	// 图标圆角度数滑动条函数
	function nst_two(){
		$('.nstSlider-two').nstSlider({	
		    "left_grip_selector": ".leftGrip-two",
		    "value_bar_selector": ".bar-two",
		    "value_changed_callback": function(cause, leftValue, rightValue) {
		    	var myStorage = JSON.parse(localStorage.getItem('Infinity_Angular_Json'));	
	    		myStorage.radius = leftValue;
		    	localStorage.setItem('Infinity_Angular_Json',JSON.stringify(myStorage));    	
		        $(this).parent().find('.leftLabel-two').text(leftValue+'%');
		        $('.biaoLogo,#yulan-back').css('border-radius',leftValue/2+'%');
		        $('#xiangmuMain-tj .rightBar li .logo').css('border-radius',leftValue/2+'%');
		    }
		});
	}	
	if (localStorage.getItem('Infinity_Angular_Update') != 2){
		$('#bg').show();
		$('#updateDiv').hide().slideDown(1000);		
	}
	// 更新说明
	$('#updateImg').click(function(){
		$('#bg').show();
		$('#updateDiv').hide().slideDown(1000);
	})
	$('#close').click(function(){
		$('#bg').hide();
		localStorage.setItem('Infinity_Angular_Update','2');
	})
	// 左下角音乐事件
	$('#musicButton').click(function(){
		$(this).hide();
		$('#bofangqi').show().addClass('music-guodu');
		setTimeout(function(){
			$('#bofangqiClose').show();
		},1000);
	});
	$('#bofangqiClose').click(function(){
		$(this).hide();
		$('#bofangqi').removeClass('music-guodu').addClass('music-back');
		setTimeout(function(){
			$('#bofangqi').hide().removeClass('music-back');
			$('#musicButton').show();
		},1000);			
	});
	// 推荐标签
	for (i in hashArray){
		if (hashArray[i] == routeHash){
			$('#xiangmuMain-tj .leftBar a:nth-child('+(parseInt(i)+1)+')').find('li').addClass('li_click');
		}
	}
	$('#xiangmuMain-tj .leftBar a').click(function(){
		$(this).siblings().find('li').removeClass('li_click');
		$(this).find('li').addClass('li_click');
	})

	// 禁用右键菜单事件
	$('html').contextmenu(function(e){
		// return false;
		e.preventDefault();
	});
	// 右键点击事件
	function rightClick(){
		$('.mainCenterLi').contextmenu(function(){
			$(this).find('.removeIco,.editIco').css('visibility','visible');
			hideRe();
		});		
	}
	setInterval(rightClick,500);
	function hideRe(){
		$(document).click(function(){
			var theEvent = window.event || arguments.callee.caller.arguments[0];
			var obj = theEvent.srcElement ? theEvent.srcElement : theEvent.target;
			if (obj.classname != 'mainCenterLi'){
				$('.removeIco,.editIco').css('visibility','hidden');
			}
		})		
	}
	// 删除按钮hover事件
	setInterval(function(){
		$('.removeIco').hover(function(){
			$(this).parent().addClass('liRotate');
		},function(){
			$(this).parent().removeClass('liRotate');
		});		
	},1000);

});
// 音乐播放
$(function(){
    $('.volume_icon').attr('title','点击设为静音(M)');
    $('.play_bt').attr('title','播放(P)');
    var flagOne = true;
    var flagTwo = true;
    // 是否静音
    $('.volume_icon').click(function(){
        if (flagOne){
            $('#audio')[0].muted = true;
            $('.volume_icon').css('background','url(img/player_bg.png) no-repeat -189px -63px').attr('title','点击开启声音(M)');
            $('.volume_icon').hover(function(){
                $('.volume_icon').css('background','url(img/player_bg.png) no-repeat -189px -63px');
            },function(){
                $('.volume_icon').css('background','url(img/player_bg.png) no-repeat -152px -63px');
            })
        }
        else {
            $('#audio')[0].muted = false;
            $('.volume_icon').css('background','url(img/player_bg.png) no-repeat -189px -35px').attr('title','点击设为静音(M)');
            $('.volume_icon').hover(function(){
                $('.volume_icon').css('background','url(img/player_bg.png) no-repeat -189px -35px');
            },function(){
                $('.volume_icon').css('background','url(img/player_bg.png) no-repeat -189px -3px');
            })                       
        }
        flagOne = !flagOne;
    })

    // 播放暂停
    $('.play_bt').click(function(){
    	// 播放
        if (flagTwo){
        	if ($('#musicButton').hasClass('music-xuanzhuan')){
        		$('#musicButton').removeClass('music-pause');
        	}
        	else {
        		$("#musicButton").addClass('music-xuanzhuan');
        	}
        	
            $('#audio')[0].play();
            $('.play_bt').css('background','url(img/player_bg.png) no-repeat -333px -88px').attr('title','暂停(P)');
            $('.play_bt').hover(function(){
                $('.play_bt').css('background','url(img/player_bg.png) no-repeat -333px -88px');
            },function(){
                $('.play_bt').css('background','url(img/player_bg.png) no-repeat -291px -88px');
            });
        }
        // 暂停
        else {
        	$("#musicButton").addClass('music-pause');
            $('#audio')[0].pause();
            $('.play_bt').css('background','url(img/player_bg.png) no-repeat -105px -42px').attr('title','播放(P)');
            $('.play_bt').hover(function(){
                $('.play_bt').css('background','url(img/player_bg.png) no-repeat -105px -42px');
            },function(){
                $('.play_bt').css('background','url(img/player_bg.png) no-repeat -105px 0px');
            })                       
        }
        flagTwo = !flagTwo;        
    })
    // 快捷键
    $(document).keydown(function(e){
        // 是否静音M键快捷
        if (e.keyCode == 77){
            $('.volume_icon').click().mouseout();
        }
        // 播放暂停P键快捷
        if (e.keyCode == 80){
            $('.play_bt').click().mouseout();
        }        
    })

    // 调节音量
    $('#audio')[0].volume = 0.5;

    $('.nstSlider-three').nstSlider({
        "left_grip_selector": ".leftGrip-three",
        "value_bar_selector": ".bar-three",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            diaoYin(leftValue);
        }
    });
});

// 调节音量函数
function diaoYin(num){
    var num = num/100;
    $('#audio')[0].volume = num;
}
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
	// 搜索选项参数
	$scope.searchTypeList = [{
		type:'page',
		title:'网页'
	},{
		type:'image',
		title:'图片'
	},{
		type:'map',
		title:'地图'
	},{
		type:'video',
		title:'视频'
	},{
		type:'news',
		title:'新闻'
	}];
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
// 添加标签指令
app.directive('clickLink',function(locals){
	return {
		restrict : "EA",
		replace : true,
		template: "<ul>" +
		"<li ng-repeat='i in items | searchFor:searchString' title='{{i.titleName}}' url='{{i.linkHref}}'>" +
			"<div class='logo'>" +
				"<img src='{{i.imgSrc}}' url='{{i.titleName}},{{i.imgSrc}},{{i.linkHref}}' ng-click='add($event)' />" +
			"</div>" +
			"<div class='title'>{{i.titleName}}</div>" +
		"</li>" +
		"</ul>",
		link: function($scope,$element,$attrs){
			$scope.add = function($event){
				var x = $event.target.getAttribute('url').split(',');
				var scopeRadius = $('#yulan-back').css('border-radius');
				var scopeOpacity = $('#yulan-back').css('opacity');
				$scope.todoList.push({
					add:x[2],
					wenZi:x[0],
					color:'url('+x[1]+')',
					title:'',
					radius:scopeRadius,
					opacity:scopeOpacity
				});
				tipFadeOut('添加成功');
				locals.set('Infinity_Angular_Array',angular.toJson($scope.todoList));
			}
		}
	}
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
// 应用和工具控制器
app.controller('appCtrl',function($scope){
	$scope.items = [{
		imgSrc: 'http://i4.buimg.com/573358/b38d1bf1c6ef661e.png',
		titleName: '支付宝',
		linkHref: 'https://www.alipay.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/0c4b728386098f3a.png',
		titleName: 'Google商店',
		linkHref: 'https://chrome.google.com/webstore'
	},{
		imgSrc: 'http://i4.buimg.com/573358/617bbbc88975c848.png',
		titleName: 'QQ邮箱',
		linkHref: 'http://mail.qq.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/ac3d00eece63abb6.png',
		titleName: '百度云',
		linkHref: 'http://pan.baidu.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/720fdb4c8b8a08c0.png',
		titleName: '百度地图',
		linkHref: 'http://map.baidu.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/7fa529e05f8433fb.png',
		titleName: 'APP每日推送',
		linkHref: 'http://appdp.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/94a50075937920bd.png',
		titleName: '微信公众平台',
		linkHref: 'https://mp.weixin.qq.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/8ea6ce8ab190d514.png',
		titleName: '360云盘',
		linkHref: 'http://yunpan.360.cn/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/0cd7b16132b1e691.png',
		titleName: '影梭',
		linkHref: 'http://www.ishadowsocks.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/9d18d74824b848df.png',
		titleName: '迅雷离线下载',
		linkHref: 'http://lixian.xunlei.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/144049d6f2127d93.png',
		titleName: '印象笔记',
		linkHref: 'http://www.yinxiang.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/d7038c1f253345e2.png',
		titleName: '高德地图',
		linkHref: 'http://ditu.amap.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/f75bab18725144da.png',
		titleName: 'Bootstrap文档',
		linkHref: 'http://v3.bootcss.com'
	},{
		imgSrc: 'http://i4.buimg.com/573358/02c4f8ce6633fcec.png',
		titleName: '最美应用',
		linkHref: 'http://zuimeia.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/bf59844aa755c6b9.png',
		titleName: '快递100',
		linkHref: 'http://www.kuaidi100.com/'
	}];
})

// 新闻和阅读控制器
app.controller('newsCtrl',function($scope){
	$scope.items = [{
		imgSrc: 'http://i2.buimg.com/573358/682f6c420244c204.png',
		titleName: '凤凰新闻',
		linkHref: 'http://news.ifeng.com/'
	},{
		imgSrc: 'http://i2.buimg.com/573358/33756689699b9a10.png',
		titleName: '豆瓣',
		linkHref: 'http://douban.com/'
	},{
		imgSrc: 'http://i2.buimg.com/573358/7521615539e67dc6.png',
		titleName: '头条',
		linkHref: 'http://toutiao.com/'
	}]
})
// 音乐和视频控制器
app.controller('musicCtrl',function($scope){
	$scope.items = [{
		imgSrc: 'http://i4.buimg.com/573358/f7ecd5eb89b13567.png',
		titleName: '哔哩哔哩',
		linkHref: 'http://www.bilibili.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/87d6b06d335c14af.png',
		titleName: '爱奇艺',
		linkHref: 'http://www.iqiyi.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/9b3d92b8746de5f6.png',
		titleName: '网易云',
		linkHref: 'http://music.163.com/'
	}]
})
// 图片与照片控制器
app.controller('picCtrl',function($scope){
	$scope.items = [{
		imgSrc: 'http://i2.buimg.com/573358/6185c8edfbb6d99b.png',
		titleName: 'instagram',
		linkHref: 'http://www.instagram.com/'
	},{
		imgSrc: 'http://i2.buimg.com/573358/9458a8ad4d1e47c1.png',
		titleName: '花瓣网',
		linkHref: 'http://huaban.com/'
	},{
		imgSrc: 'http://i2.buimg.com/573358/2a77eec09dca8761.png',
		titleName: '优美图',
		linkHref: 'http://www.topit.me'
	}]
})
// 购物与团购控制器
app.controller('shopCtrl',function($scope){
	$scope.items = [{
		imgSrc: 'http://i2.buimg.com/573358/0b7aab83357cd791.png',
		titleName: '淘宝',
		linkHref: 'http://taobao.com'
	}]
})

// 体育与旅行控制器
app.controller('sportCtrl',function($scope){
	$scope.items = [{
		imgSrc: 'http://i2.buimg.com/573358/78279bb3fa8619d6.png',
		titleName: '虎扑体育',
		linkHref: 'http://hupu.com/'
	},{
		imgSrc: 'http://i2.buimg.com/573358/1a575689c904a49b.png',
		titleName: '新浪体育',
		linkHref: 'http://sports.sina.com.cn'
	},{
		imgSrc: 'http://i2.buimg.com/573358/7980435ae7f4e563.png',
		titleName: '去哪儿',
		linkHref: 'http://www.qunar.com/'
	}]
})
// 社交与博客控制器
app.controller('blogCtrl',function($scope){
	$scope.items = [{
		imgSrc: 'http://i4.buimg.com/573358/d85994194b505596.png',
		titleName: '知乎',
		linkHref: 'http://zhihu.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/ab54bca46581ca4c.png',
		titleName: '新浪微博',
		linkHref: 'http://weibo.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/83286a69f6c1059b.png',
		titleName: '百度贴吧',
		linkHref: 'http://tieba.baidu.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/57244219a184cf63.png',
		titleName: '微信网页版',
		linkHref: 'http://wx.qq.com/'
	}]
})
// 数码和科技控制器
app.controller('tecCtrl',function($scope){
	$scope.items = [{
		imgSrc: 'http://i2.buimg.com/573358/00b1a0051826cee8.png',
		titleName: '果壳网',
		linkHref: 'http://guokr.com/'
	},{
		imgSrc: 'http://i2.buimg.com/573358/3fd34b732e538815.png',
		titleName: '36Kr',
		linkHref: 'http://36kr.com/'
	},{
		imgSrc: 'http://i2.buimg.com/573358/0bab6c0a7847bb05.png',
		titleName: 'IT之家',
		linkHref: 'http://www.ithome.com/'
	}]
})
// 游戏与娱乐控制器
app.controller('gameCtrl',function($scope){
	$scope.items = [{
		imgSrc: 'http://i4.buimg.com/573358/7fdac64522ae6b35.png',
		titleName: 'steam',
		linkHref: 'http://store.steampowered.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/ed1a5acf2916661e.png',
		titleName: '暴走漫画',
		linkHref: 'http://baozoumanhua.com'
	}]
})
// 教育与招聘控制器
app.controller('eduCtrl',function($scope){
	$scope.items = [{
		imgSrc: 'http://i4.buimg.com/573358/0a06006b3f0056b5.png',
		titleName: '慕课网',
		linkHref: 'http://www.imooc.com'
	},{
		imgSrc: 'http://i4.buimg.com/573358/0605f221468f46dd.png',
		titleName: '网易公开课',
		linkHref: 'http://open.163.com/'
	},{
		imgSrc: 'http://i4.buimg.com/573358/affbb115fd960f36.png',
		titleName: '智联招聘',
		linkHref: 'http://zhaopin.com/'
	}]
})
// 路由
app.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when('/',{
			template: "<click-link></click-link>",
			controller: 'appCtrl'
		})
		.when('/news',{
			template: "<click-link></click-link>",
			controller: 'newsCtrl'
		})
		.when('/music',{
			template: "<click-link></click-link>",
			controller: 'musicCtrl'
		})
		.when('/pic',{
			template: "<click-link></click-link>",
			controller: 'picCtrl'
		})
		.when('/shop',{
			template: "<click-link></click-link>",
			controller: 'shopCtrl'
		})
		.when('/sport',{
			template: "<click-link></click-link>",
			controller: 'sportCtrl'
		})
		.when('/blog',{
			template: "<click-link></click-link>",
			controller: 'blogCtrl'
		})
		.when('/tec',{
			template: "<click-link></click-link>",
			controller: 'tecCtrl'
		})
		.when('/game',{
			template: "<click-link></click-link>",
			controller: 'gameCtrl'
		})
		.when('/edu',{
			template: "<click-link></click-link>",
			controller: 'eduCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}])