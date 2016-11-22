define(['jquery'],function($){
	var init = function(){
		// 左下角音乐事件
		$('#musicButton').click(function(){
			$(this).hide();
			$('#bofangqi').removeClass("hiddened").addClass('music-guodu');
			setTimeout(function(){
				$('#bofangqiClose').show();
			},1000);
		});
		$('#bofangqiClose').click(function(){
			$(this).hide();
			$('#bofangqi').removeClass('music-guodu').addClass('music-back');
			setTimeout(function(){
				$('#bofangqi').removeClass('music-back').addClass('hiddened');
				$('#musicButton').show();
			},1000);			
		});		
	}
	return {
		init:init,
	}
})


