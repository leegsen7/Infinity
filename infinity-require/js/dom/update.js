define(['storage'],function(storage){
	var init = function(){
		// 弹出更新说明
		if (storage.get('Infinity_Angular_Update') != 2){
			alert(storage.get('Infinity_Angular_Update'));
			$('#bg').show();
			$('#updateDiv').hide().slideDown(1000);		
		}
		// 更新说明
		$('#updateImg').click(function(){
			$('#bg').show();
			$('#updateDiv').hide().slideDown(1000);
		})
		$('#close').click(function(){
			$('#bg').hide();
			storage.set('Infinity_Angular_Update',2);
		})		
	}
	return {
		init:init
	}
})