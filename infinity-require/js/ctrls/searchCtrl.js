define(['app','storage'],function(app,storage){
	app.controller('searchCtrl',function($scope,$http,$timeout){
		// 搜索选项参数
		$scope.searchTypeList = [{
			title:'网页'
		},{
			title:'图片'
		},{
			title:'地图'
		},{
			title:'视频'
		},{
			title:'新闻'
		}];		
		$scope.searchJson = [[
			'https://www.baidu.com/s?ie=UTF-8&wd=',
			'http://image.baidu.com/search/index?tn=baiduimage&word=',
			'http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D',
			'http://video.baidu.com/v?ie=utf-8&word=',
			'http://news.baidu.com/ns?tn=news&ie=utf-8&word='				
		],[
			'https://www.google.com/search?q=',
			'https://www.google.com/search?tbm=isch&q=',
			'https://www.google.com/maps/preview?q=',
			'https://www.google.com/search?tbm=vid&q=',
			'https://www.google.com/search?tbm=nws&q='
		]];	
		// 改变搜索类型
		$scope.typeNum = 0;
		$scope.changeType = function($index){
			$scope.typeNum = $index;
		}
		// 改变搜索引擎
		$scope.changeSearch = function(num){
			$scope.searchNum = num;
			storage.set('Infinity_Angular_Search',num);
			// google搜索
			if (num == 2){
				$scope.style = {
					'background-position-x':'0rem'
				};
				$scope.placeholder = 'Google 搜索';
			}
			// 百度搜索
			if (num == 1){
				$scope.style = {
					'background-position-x':'-2rem'
				};
				$scope.placeholder = '百度一下，你就知道';
			}
		}
		if (storage.get('Infinity_Angular_Search')){
			$scope.changeSearch(storage.get('Infinity_Angular_Search'));
		}
		else {
			$scope.searchNum = 1;
		}		
		// 搜索
		$scope.toSearch = function(x){
			if ($scope.inputStr){
				x = x || $scope.inputStr;
				var totleUrl = $scope.searchJson[$scope.searchNum-1][$scope.typeNum] + x;
			}
			else{
				var totleUrl = $scope.searchJson[$scope.searchNum-1][$scope.typeNum];
			}
			window.location.href = totleUrl;
		}
		$scope.num = 0;
	    $scope.keydown = function($event){
	    	// P和M键不响应
	    	if ($event.keyCode == 80 || $event.keyCode == 77){
	    		$event.stopPropagation();
	    	}
	    	// 回车搜索
	        if ($event.keyCode == 13){
	            $scope.toSearch();
	        }
	        // 上方向键
	        if ($event.keyCode == 38){
	        	var linData = $scope.inputStr;
	        	$scope.num--;
	        	if ($scope.num < 0){
	        		$scope.num = $scope.searchInfoList.length<6?$scope.searchInfoList.length:6;
	        	}
	        	if ($scope.num == 0){
	        		$scope.inputStr = linData;
	        		return false;	        		
	        	}
	        	$scope.inputStr = $scope.searchInfoList[$scope.num-1];
	        }
	        // 下方向键
	        if ($event.keyCode == 40){
	        	var linData = $scope.inputStr;
	        	$scope.num++;
	        	if ($scope.num > ($scope.searchInfoList.length<6?$scope.searchInfoList.length:6)){
	        		$scope.num = 0;
	        		$scope.inputStr = linData;
	        		return false;
	        	}
	        	$scope.inputStr = $scope.searchInfoList[$scope.num-1];
	        }	        
	    }	
	    // 搜索提示信息
	    $scope.toSearchInfo = function(){
	    	$scope.searchInfoList = [];
		    if ($scope.inputStr){
			    $http.jsonp('http://suggestion.baidu.com/su?cb=JSON_CALLBACK&wd='+$scope.inputStr).success(function(data){
			    	$scope.searchInfoList = data.s;
			    });	
		    }
	    }
	    // 显示和隐藏
	    $scope.flag = false;
	    $scope.hideFlag = function(){
	    	$timeout(function(){
	    		$scope.flag = false;
	    	},100);
	    }
	    $scope.showFlag = function(){
	    	$scope.flag = true;
	    }
	    $scope.$on('giveFontColor',function(e,data){
	    	$scope.fontColor = data;
	    });
	})
});