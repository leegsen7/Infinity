// 操作提示函数
var tipFadeOut = function(str){


    $('body').append('<span class="change-tip">'+str+'</span>');
    tipFadeOut_st = setTimeout(function(){
        $(".change-tip").fadeOut(1500,function(){
            $(".change-tip").remove();
        })
    },3000);        
}
// 音乐播放
$(function(){
    //展开播放列表
    $("#spansongnum1").click(function(){
        $("#divplayframe").show();
        $("#divplayframe").animate({
            opacity:'1'
        },250);
    });

    //收起列表
    $("#btnclose").click(function(){
        $("#divplayframe").animate({
            opacity:'0'
        },250,function(){
            $("#divplayframe").hide();
        });
    });

    // 切换列表框和搜索框
    $('#tab_container li').click(function(){
        $(this).addClass('current').append('<i></i>').siblings().removeClass('current').find('i').remove();
        if ($(this).index() == 0){
            $("#divlistmain").show();
            $("#searchList").hide();
        }
        else {
            $("#divlistmain").hide();
            $("#searchList").show();
        }
    });	

    $('.volume_icon').attr('title','点击设为静音(M)');
    $('.play_bt').attr('title','播放(P)');
    var flagOne = true;
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

    // 快捷键
    $(document).keydown(function(e){
        // 是否静音M键快捷
        if (e.keyCode == 77){
            $('.volume_icon').click().mouseout();
        }       
    })

    // 设置音量
    $('#audio')[0].volume = 1;  
    $('#sliderDivThree').attr('title','音量100%');   
});
var slider3 = new Slider('sliderGripThree','sliderDivThree','sliderBarThree'); //音量
slider3.init(function(e){
    diaoYin(e);
    $('#sliderDivThree').attr('title','音量'+e+'%');
});
slider3.setSlider(100);
// 调节音量函数
function diaoYin(num){
    var num = num/100;
    $('#audio')[0].volume = num;
}

var slider4 = new Slider('sliderGripFour','sliderDivFour','sliderBarFour'); // 进度
slider4.init(function(e){
    jindu(e);
})
// 歌曲调节进度
var jindu = function(num){
    if (num != 0){
        $('#audio')[0].currentTime = $('#audio')[0].duration*num/100;
    }
}

var app = angular.module('myApp',[]);
// 函数
app.factory('local',['$window',function($window){
    return {
        set: function(key,value){
            $window.localStorage[key] = angular.toJson(value);
        },
        get: function(key){
            return angular.fromJson($window.localStorage[key]);
        }   
    }
}])
// 指令
app.directive('searchLi',function(local){
    return {
        restrict : "EA",
        replace : true,
        template: "<div>" +
            "<li class='m_search_info_title' ng-repeat='x in searchList' ng-dblclick='dbplay(x)'>"+
                "<span title={{x.name}}>{{x.name}}</span>"+
                "<span title={{x.artists[0].name}}>{{x.artists[0].name}}</span>"+
                "<span title={{x.album.name}}>{{x.album.name}}</span>"+
                "<span ng-click='addList(x)'></span>"+
            "</li>"+
        "</div>",
        link: function($scope,$element,$attrs){
            $scope.dbplay = function(x){
                $scope.addList(x);
                $scope.playmusic(x);
            }
            $scope.addList = function(x){
                $scope.musicList.push(x);
                local.set('musicList',$scope.musicList);
            }
        }
    }
})

// 控制器
app.controller('myCtrl',function($scope,$http,$sce,$timeout,local,$interval){
    $scope.sce = $sce.trustAsResourceUrl;
    // 播放列表
    if (local.get('musicList')){
        $scope.musicList = local.get('musicList');
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
        slider4.setSlider(($('#audio')[0].currentTime/$('#audio')[0].duration*100).toFixed(1));
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
        local.set('musicList',$scope.musicList);
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
    // 全局键盘事件
    $scope.keyEvents = function($event){
        // P键暂停或播放
        if ($event.keyCode == 80){
            if ($scope.isPlay()){
                $scope.play();
            }
            else {
                $scope.pause();
            }
        }
    }
});