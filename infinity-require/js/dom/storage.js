define(function(){
	var getItem = function(key){
		return JSON.parse(localStorage.getItem(key));
	}
	var setItem = function(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	}
	return {
		get:getItem,
		set:setItem,
	}
})