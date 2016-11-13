define(['jquery'],function($){
	var init = function(){
		$('#addButton').click(function(){
			var offsetRight = $('#rightBar').offset().left;
			if (offsetRight < $(document.body).width()){
				$('#addButton').addClass('add-rotate-back');
				$('#rightBar').animate({
					right:'-350px',
				},1000,function(){
					setTimeout(function(){
						$('#addButton').removeClass('add-rotate-back').removeClass('add-rotate');
					},1000);
				});				
			}
			else {
				$('#addButton').addClass('add-rotate');
				$('#rightBar').animate({
					right:'0px',
				},1000);
			}
		});			
	}

	return {
		init:init
	}
})