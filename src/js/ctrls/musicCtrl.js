define(function(require){
	var app = require('app');
	var storage = require('storage');
	var Slider = require('slider');
	var Parabola = require('parabola');

	var sliderJindu = new Slider('jinduSliderGrip','jinduSliderDiv','jinduSliderBar');
	var sliderVolume = new Slider('volumeSliderGrip','volumeSliderDiv','volumeSliderBar');	
	// 音乐控制器
	app.controller('musicCtrl',['$scope','$http','$sce','$timeout','$interval','$document','toastr','getApi',function($scope,$http,$sce,$timeout,$interval,$document,toastr,getApi){
		var promise = getApi.apiData;
		var config = {
			el: ".m_search_add_target",
			targetEl:'#target',
			offset: [10, 10],
			duration: 800,
			curvature: 0.01,
			callback:function(){
				$('.m_search_add_target').remove();
			}			
		};		
		var addPerfor = function(x,y){
			$("<div class='m_search_add_target'></div>").appendTo('body').css({
				'left':x+'px',
				'top':y+'px'
			});
			var parabola = new Parabola(config);		
			parabola.start();	
		}
		$scope.volumeTip = '50%';
		sliderVolume.init(function(e){
		    yinliang(e);
		});	
		sliderVolume.setSlider(50);		
		$('#audio')[0].volume = 0.5;
		function yinliang(num){
			$('#audio')[0].volume = num/100;
			$scope.volumeTip = num + '%';
		}
		function jindu(num){
		    if (num != 0){
		        $('#audio')[0].currentTime = $('#audio')[0].duration*num/100;
		    }
		}	
		sliderJindu.init(function(e){
		    jindu(e);
		});			
	    $scope.sce = $sce.trustAsResourceUrl;
	    $scope.waiting = false;

	    promise.then(function(data){
	    	$scope.musicList = storage.get('musicList') || data.musicList;
		    // 默认第一首
		    $scope.inter = $interval(function() {
		    	if (document.readyState=="complete"){
		    		$scope.nowList = $scope.musicList[0];
		    		$interval.cancel($scope.inter);
		    	}
		    }, 100);
		    
	    })
	    
	    // 是否静音
	    $scope.ismuted = function(){
	    	return $('#audio')[0].muted;
	    }
	    $scope.volumeTitle = '点击设为静音(M)';
	    $scope.changeMuted = function(){
	    	// 开启声音
	    	if ($scope.ismuted()){
				$('#audio')[0].muted = false;
				$scope.volumePosition = '-189px';
				$scope.volumeTitle = '点击设为静音(M)';
	    	}
	    	// 静音
	    	else {
    			$('#audio')[0].muted = true;
				$scope.volumePosition = '-225px';
				$scope.volumeTitle = '点击开启声音(M)';
	    	}
	    }
	    $scope.playmodelTitle = "列表循环";
	    // 播放模式：1-列表循环 2-单曲循环
	    $scope.playModel = function(){
	    	if ($scope.playmodelTitle == "列表循环"){
	    		$scope.playmodelX = '-255px';
	    		$scope.playmodelTitle = "单曲循环";
	    		$('#audio').attr('loop',true);
	    	}
	    	else {
	    		$scope.playmodelX = '-291px';
	    		$scope.playmodelTitle = "列表循环";
	    		$('#audio').attr('loop',false);
	    	}
	    }	    
	    // 是否播放
	    $scope.isPlay = function(){
	        return $('#audio')[0].paused;
	    }
	    // 播放
	    $scope.play = function(){
	        if ($scope.musicList == ''){
	            toastr.warning('播放列表为空，快去搜索歌曲添加吧');
	            return false;
	        }
	        if ($scope.nowList == undefined && $scope.musicList){
	            $scope.nowList = $scope.musicList[0];
	            $timeout(function(){
	                $('#audio')[0].play();
	            },100);            
	        }
	        $('#audio')[0].play();
	        $scope.musicList.forEach(function(v,i,_){
	            if (v == $scope.nowList){
	            	$scope.musicLiveNum = i;
	            }
	        });
	        $('#musicButton').attr('title',$scope.nowList.artists[0].name+'-'+$scope.nowList.name).addClass('music-xuanzhuan').removeClass('music-pause');
	    }
	    // 暂停
	    $scope.pause = function(){
	    	$('#musicButton').addClass('music-pause');
	        $('#audio')[0].pause();
	    }
	    // 歌曲时长
	    $scope.totleTime = function(){
	        if (isNaN($('#audio')[0].duration)){
	            return '--:--';
	        }
	        var min = Math.floor($('#audio')[0].duration/60);
	        var sec = Math.floor($('#audio')[0].duration%60);
	        if (min < 10){
	            min = '0' + min;
	        }
	        if (sec < 10){
	            sec = '0' + sec;
	        }        
	        return min+':'+sec;
	    } 
	    // 当前时长
	    $interval(function(){
	        $scope.nowTime = function(){
	            var min = Math.floor($('#audio')[0].currentTime/60);
	            var sec = Math.floor($('#audio')[0].currentTime%60);
	            if (min < 10){
	                min = '0' + min;
	            }
	            if (sec < 10){
	                sec = '0' + sec;
	            }
	            return min+':'+sec;            
	        }
	        sliderJindu.setSlider(($('#audio')[0].currentTime/$('#audio')[0].duration*100).toFixed(1));
	    },100);     
	   
	    // 删除一首歌
	    $scope.removeList = function(x){
	        $scope.musicList.forEach(function(v,i,_){
	            if (v == x){
	                if (angular.toJson(x) == angular.toJson($scope.nowList)){
	                    $scope.next();
	                }
	                _.splice(i,1);
	            }
	        });
	        storage.set('musicList',$scope.musicList);
	        toastr.success('删除歌曲成功');
	    }
	    // 播放一首歌
	    $scope.playmusic = function(x){
	        var img = new window.Image();
	        img.src = x.album.picUrl;
	        $scope.nowList = x;
	        $timeout(function(){
	            $scope.play();
	        },100);
	        
	    }
	    // 下一首歌
	    $scope.next = function(){
	    	sliderJindu.setSlider(0);
	        var len = $scope.musicList.length;
	        if (len == 1){
	            toastr.warning('当前只有一首歌~');
	            return;
	        }        
	        for (var i=0;i<len;i++){
	            if (angular.toJson($scope.nowList) === angular.toJson($scope.musicList[i])){
	                if (i == len - 1){
	                    if ($scope.isPlay()){
	                        $scope.nowList = $scope.musicList[0];
	                    }
	                    else {
	                        $scope.playmusic($scope.musicList[0]);    
	                    }
	                                    
	                }
	                else {
	                    if ($scope.isPlay()){
	                        $scope.nowList = $scope.musicList[i+1];
	                    }
	                    else {
	                        $scope.playmusic($scope.musicList[i+1]);
	                    }
	                }
	                break;
	            }
	        }
	    }
	    // 上一首歌
	    $scope.prev = function(){
	    	sliderJindu.setSlider(0);
	        var len = $scope.musicList.length;
	        if (len == 1){
	            toastr.warning('当前只有一首歌~');
	            return;
	        }
	        for (var i=0;i<len;i++){
	            if (angular.toJson($scope.nowList) === angular.toJson($scope.musicList[i])){
	                if (i == 0){
	                    if ($scope.isPlay()){
	                        $scope.nowList = $scope.musicList[len - 1];
	                    }
	                    else {
	                        $scope.playmusic($scope.musicList[len - 1]);    
	                    }                    
	                }
	                else {
	                    if ($scope.isPlay()){
	                        $scope.nowList = $scope.musicList[i-1];
	                    }
	                    else {
	                        $scope.playmusic($scope.musicList[i-1]);    
	                    }                    
	                    
	                }
	                break;
	            }
	        }        
	    }
	    // 清除歌曲列表
	    $scope.clearList = function(){
	    	$scope.musicList = [];
	    	$scope.nowList = [];
	    }

	    // 播放完后自动下一首
	    $('#audio')[0].addEventListener('ended',function(){
	        $scope.next();
	        console.log('end');
	        $timeout(function(){
	            $scope.play();
	        },100);
	    },true);

	    // 搜索歌曲
	    $scope.searchList = [];

	    $scope.toSearch = function($element){
	        if (!$scope.searchValue){
	            return false;
	        }	  
	        $scope.waiting = true;  	
	        if ($scope.searchList.length > 0){
	            $scope.searchList = [];
	        }
	        var url = 'http://s.music.163.com/search/get/?callback=JSON_CALLBACK&type=1&limit=100&s=';
	        // var url = 'http://music.163.com/api/search/get/?callback=JSON_CALLBACK&type=100&s=';
            $http.jsonp(url+$scope.searchValue).success(function(data){
                var data = data.result.songs;
                $timeout(function(){
                	$scope.waiting = false;  	
                	$scope.searchList = data;   
                },500);
            });
	    };
	    // 搜索歌曲 enter键
	    $scope.keydown = function($event){
	    	// P和M键不响应
	    	if ($event.keyCode == 80 || $event.keyCode == 77){
	    		$event.stopPropagation();
	    	}	    	
	        if ($event.keyCode == 13){
	            $scope.toSearch();
	        }
	    }
	    // 搜索歌曲列表-双击播放
        $scope.dbplay = function(x,$event){     
          	if (angular.toJson($scope.nowList) === angular.toJson(x)){
          		return false;
          	}
            $scope.playmusic(x);
            // 歌曲不在列表中就添加歌曲
            if (!$scope.hasId(x)){
            	$scope.addList(x,$event);
            }
            else {
				addPerfor($event.pageX-9,$event.pageY-9);
            }
        }
        $scope.hasId = function(x){
        	var flag = false;
        	for (i in $scope.musicList){
        		if (x.id == $scope.musicList[i].id){
        			flag = true;
        		}
        	}     
        	return flag;   	
        }
        // 添加到列表中
        $scope.addList = function(x,$event){
        	if ($scope.hasId(x)){
        		toastr.warning('歌曲已经在列表中了');
        		return false;
        	}
        	addPerfor($event.pageX-9,$event.pageY-9);
            $scope.musicList.push(x);
            storage.set('musicList',$scope.musicList);
            toastr.success('添加歌曲成功');
        }	    
	    // 全局键盘事件
	    $document.bind('keydown',function($event){
	    	$scope.$apply(function(){
		        // P键暂停或播放
		        if ($event.keyCode == 80){
		            if ($scope.isPlay()){
		                $scope.play();
		            }
		            else {
		                $scope.pause();
		            }
		        }
		        // M键开启声音或静音
		        if ($event.keyCode == 77){
		        	$scope.changeMuted();
		        }
	    	})
	    });
	}]);
})