define(function(require){
	var app = require('app');
	
	// 添加标签指令
	app.directive('clickLink',function(){
		return {
			restrict : "EA",
			replace : true,
			template: "<ul class='view-ul'>" +
			"<li class='view-li' ng-repeat='i in items | searchFor:searchString' title='{{i.titleName}}' ng-click='add(i)'>" +
				"<div class='view-li-logo'>" +
					"<img class='view-li-logo-img' ng-src='{{i.imgSrc}}' />" +
				"</div>" +
				"<div class='view-li-title'>{{i.titleName}}</div>" +
			"</li>" +
			"</ul>",
		}
	})	
})