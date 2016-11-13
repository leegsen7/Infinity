// 开始动画
define(['jquery'],function($){
	var start = function(){
		var a = Math.floor(Math.random()*15+1);
		var t = setInterval(function(){
			var num = Math.floor(Math.random()*10+1);
			a = a + num;
			if (document.readyState=="complete"){
				$('#loadingTitle').text('100%');
				$('#loadingWidth').css('width','100%');			
				clearInterval(t);
				setTimeout(function(){
					setTimeout(function(){
						// 标签放大动画
						$('#mainCenter').addClass('main-center-zoom');				
					},250);
					$('#loadingBg').hide(500,function(){
						$("#loadingBg").remove();
					});
				},600);
			}
			else{
				if (a < 100){
					$('#loadingTitle').text(a+'%');
					$('#loadingWidth').css('width',a+'%');
				}
			}
		},200);		
		// 禁用右键菜单事件
		$('html').contextmenu(function(e){
			// return false;
			e.preventDefault();
		});		
	}
	return {
		init:start
	}
})