define(function(require){
	var app = require('app');
	
	// 路由
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider
			.when('/',{
				template: "<click-link></click-link>",
				controller: 'appCtrl'
			})
			.when('/news',{
				template: "<click-link></click-link>",
				controller: 'newsCtrl'
			})
			.when('/music',{
				template: "<click-link></click-link>",
				controller: 'musicCtrl'
			})
			.when('/pic',{
				template: "<click-link></click-link>",
				controller: 'picCtrl'
			})
			.when('/shop',{
				template: "<click-link></click-link>",
				controller: 'shopCtrl'
			})
			.when('/sport',{
				template: "<click-link></click-link>",
				controller: 'sportCtrl'
			})
			.when('/blog',{
				template: "<click-link></click-link>",
				controller: 'blogCtrl'
			})
			.when('/tec',{
				template: "<click-link></click-link>",
				controller: 'tecCtrl'
			})
			.when('/game',{
				template: "<click-link></click-link>",
				controller: 'gameCtrl'
			})
			.when('/edu',{
				template: "<click-link></click-link>",
				controller: 'eduCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);
});