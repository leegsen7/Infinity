define(['jquery'],function($){
	// 更换背景图函数
	var changeBackground = function (num){
		var oldNum = parseInt($('#backgroundImg').css('background-image').split('beijing')[1]);
		if (oldNum == num){
			changeBackground(Math.floor(Math.random()*20+1));
			return false;
		}
		var randomSrc = 'dist/img/beijing'+num+'.png';
		var img = new window.Image();
		img.onload = function(){
			setTimeout(function(){
				$('#backgroundImg').css({
					'background-image':"url("+randomSrc+")",
				});
				$('#fengche').removeClass('fengche-rotate');
			},500);
		}
		img.src = randomSrc;
	}	

	var init = function(){
		// 设置开始随机背景图
		changeBackground(Math.floor(Math.random()*20+1));
		// 点击更换背景图
		$('#fengche').click(function(){	
			$(this).addClass('fengche-rotate');
			changeBackground(Math.floor(Math.random()*20+1));
		});		
	}

	return {
		init:init
	}
})