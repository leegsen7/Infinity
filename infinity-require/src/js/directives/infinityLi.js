define(function(require){
	var app = require('app');

	// 分页标签指令
	app.directive('infinityLi',function(){
		return {
			restrict: "EA",
			replace: true,
			template: "<li class='infinity_li'>"+
				"<ul id='sortable'>"+
					"<li ng-repeat='x in todoList track by $index' class='mainCenterLi' dragable='true' ng-right-click='rightClick($index)' ng-class='{liRotate:num==$index}'>"+
						"<a href='{{x.add}}' target='_blank'>"+
							"<div class='biaoLogo centered' style='background:{{x.color}};'>"+
								"{{x.title}}"+
							"</div>"+
							"<div class='wenZi centered' ng-bind='x.wenZi'></div>"+
						"</a>"+
						"<div class='editIco' ng-click='editBiaoqian(x,$index)' title='编辑标签' ng-show='liNum==$index'></div>"+
						"<div class='removeIco' ng-click='removeBiaoqian(x)' title='删除标签' ng-show='liNum==$index' ng-mouseover='num=$index' ng-mouseout='num=-1'></div>"+
					"</li>"+
				"</ul>"+
			"</li>",
		}
	})
})