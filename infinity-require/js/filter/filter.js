define(['app'],function(app){
	// 过滤器
	app.filter('searchFor',function(){
	    return function(arr, searchString){  
	        if(!searchString){  
	            return arr;
	        }  
	        var result = [];  
	        searchString = searchString.toLowerCase();  
	        angular.forEach(arr, function(item){  
	            if(item.titleName.toLowerCase().indexOf(searchString) !== -1){  
	                result.push(item);  
	            }  
	        });  
	        return result;  
	    };  
	})
})