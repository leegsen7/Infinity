define(['jquery'],function($){
	var init = function(){
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
	}
	return {
		init:init,
	}
})


