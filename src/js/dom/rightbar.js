define(function(){
	var init = function(){
		function scale(){
			if ($('#rightBar').hasClass('active')){
				$('#rightBar').removeClass('active');	
				$('#backgroundImg').removeClass('active');
				$("#backgroundImgFull").hide();
			}
			else {
				$('#rightBar').addClass('active');
				$('#backgroundImg').addClass('active');
				$("#backgroundImgFull").show();
			}
		}
		$('#addButton,#backgroundImgFull').click(function(){
			scale();
		});			
	}

	return {
		init:init
	}
})