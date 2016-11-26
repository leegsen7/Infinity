define(['jquery'],function($){
	// 更换背景图函数
	var changeBackground = function (num){
		var randomSrc = 'dist/img/beijing'+num+'.png';
		var img = new window.Image();
		img.src = randomSrc;

		$('#backgroundImg').css({
			'background-image':"url("+randomSrc+")",
		}).hide().fadeIn(1500);
	}	

	var init = function(){
		// 设置开始随机背景图
		changeBackground(Math.floor(Math.random()*20+1));
		// 点击更换背景图
		$('#fengche').click(function(){	
			$(this).addClass('fengche-rotate');
			setTimeout(function(){
				changeBackground(Math.floor(Math.random()*20+1));
				$('#fengche').removeClass('fengche-rotate');
			},1500);
		});		
	}

	return {
		init:init
	}
})