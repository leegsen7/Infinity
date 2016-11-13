define(['app','storage','slider'],function(app,storage,slider){
	// 音乐控制器
	app.controller('musicCtrl',function($scope,$http,$sce,$timeout,$interval){
		var sliderJindu = new Slider('sliderGripFour','sliderDivFour','sliderBarFour');
		sliderJindu.init(function(e){
		    jindu(e);
		})
		// 歌曲调节进度
		var jindu = function(num){
		    if (num != 0){
		        $('#audio')[0].currentTime = $('#audio')[0].duration*num/100;
		    }
		}		

	    $scope.sce = $sce.trustAsResourceUrl;

	    // 播放列表
	    if (storage.get('musicList')){
	        $scope.musicList = storage.get('musicList');
	    }
	    else {
	        $scope.musicList = [{
	            name:'听说爱情回来过',
	            artists:[{
	                name:'张敬轩',
	            }],
	            id:188815,
	            album:{
	                picUrl:"http://p4.music.126.net/xR6L9rX4rfRHGY8op0YiFA==/105553116278623.jpg",
	            },
	        },{
	            name:'千百度',
	            artists:[{
	                name:'许嵩',
	            }],
	            id:167732,
	            album:{
	                picUrl:"http://p1.music.126.net/fUEbmHuK22dQkUcIWiA0JA==/3352410953143856.jpg",
	            },
	        },{
	            name:'爱转角',
	            artists:[{
	                name:'罗志祥',
	            }],
	            id:5249548,
	            album:{
	                picUrl:"http://p1.music.126.net/a93EBK1a8DhKb_u0ZL5x-A==/70368744195341.jpg",
	            },
	        }];
	    }
	    // 默认第一首
	    $scope.nowList = $scope.musicList[0];
	    // 是否播放
	    $scope.isPlay = function(){
	        return $('#audio')[0].paused;
	    }
	    // 播放
	    $scope.play = function(){
	        if ($scope.musicList == ''){
	            tipFadeOut('播放列表为空，快去搜索歌曲添加吧');
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
	                var a = document.getElementsByClassName('music_list_repeat');
	                for (var j=0;j<a.length;j++){
	                    if (j == i){
	                        a[i].getElementsByClassName('live_icon')[0].style.display = 'block';
	                    }
	                    else {
	                        a[j].getElementsByClassName('live_icon')[0].style.display = 'none';
	                    }
	                }
	                
	            }
	        });
	    }
	    // 暂停
	    $scope.pause = function(){
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
	        var len = $scope.musicList.length;
	        if (len == 1){
	            tipFadeOut('当前只有一首歌~');
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
	        var len = $scope.musicList.length;
	        if (len == 1){
	            tipFadeOut('当前只有一首歌~');
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
	    // 播放完后自动下一首
	    $('#audio')[0].addEventListener('ended',function(){
	        $scope.next();
	        $timeout(function(){
	            $scope.play();
	        },100);
	    },true);

	    // 搜索歌曲
	    $scope.searchList = [];

	    $scope.toSearch = function($element){
	        if ($scope.searchList.length > 0){
	            $scope.searchList = [];
	        }
	        var mValue = $scope.searchValue;
	        var url = 'http://s.music.163.com/search/get/?callback=JSON_CALLBACK&type=1&limit=100&s=';
	        if (!mValue){
	            return false;
	        }
	        else {
	            $http.jsonp(url+mValue).success(function(data){
	                var data = data.result.songs;
	                $scope.searchList = data;           
	            });
	        } 
	    };
	    // 搜索歌曲 enter键
	    $scope.keydown = function($event){
	        if ($event.keyCode == 13){
	            $scope.toSearch();
	        }
	    }
	    // 搜索歌曲列表
        $scope.dbplay = function(x){
            $scope.addList(x);
            $scope.playmusic(x);
        }
        $scope.addList = function(x){
            $scope.musicList.push(x);
            storage.set('musicList',$scope.musicList);
        }	    
	    // 全局键盘事件
	    // $scope.keyEvents = function($event){
	    //     // P键暂停或播放
	    //     if ($event.keyCode == 80){
	    //         if ($scope.isPlay()){
	    //             $scope.play();
	    //         }
	    //         else {
	    //             $scope.pause();
	    //         }
	    //     }
	    // }
	});	
})