require.config({
    baseUrl:'./js',
	paths:{
		// lib
		"angular":"libs/angular.min",
		"angular-route":"libs/angular-route.min",
		'angular-animate':'libs/angular-animate.min',
		"jquery":"libs/jquery.min",
		"angular-toastr":"libs/angular-toastr.min",
		"angular-page":"libs/angular-page",
		// dom
		"redirect":'dom/redirect',
		'start':'dom/start',
		'background':'dom/background',
		'storage':'dom/storage',
		'update':'dom/update',
		'rightbar':'dom/rightbar',
		'music':'dom/music',
		'slider':'dom/slider',
		'parabola':'dom/parabola',
		// ctrl
		'searchCtrl':'ctrls/searchCtrl',
		'rightbarCtrl':'ctrls/rightbarCtrl',
		'routeCtrl':'ctrls/routeCtrl',
		'infinityCtrl':'ctrls/infinityCtrl',
		'changeCtrl':'ctrls/changeCtrl',
		'bodyCtrl':'ctrls/bodyCtrl',
		'musicCtrl':'ctrls/musicCtrl',
		// directives
		'clickLink':'directives/clickLink',
		'ngRightClick':'directives/ngRightClick',
		// filter
		'filter':'filter/filter',
		// factory
		'service':'factory/service',
	},
    shim:{
        "angular":{
        	deps:['jquery'],
            exports:"angular"
        },
        "angular-route":{
            deps: ["angular"],
            exports:"angular-route",
        },
        'angular-animate':{
        	deps:['angular'],
        	exports:'angular-animate',
        },
        'angular-toastr':{
        	deps:["angular"],
        	export:'toastr',
        },
        'angular-page':{
        	deps:['angular'],
        	exports:'ngPage',
        },
        'parabola':{
        	deps:['jquery'],
        	exports:'parabola',
        }
    }	
});

require([
	'redirect',
	'start',
	'angular',
	'update',
	'background',
	'rightbar',
	'music',
	// 'angular-route',
	'service',
	'infinityCtrl',
	'ngRightClick',
	'changeCtrl',
	'searchCtrl',
	'bodyCtrl',
	'rightbarCtrl',
	'clickLink',
	'routeCtrl',
	'musicCtrl',
	'filter',
	'route',
	],function(redirect,start,angular,update,background,rightbar,music){
	redirect.init();
	start.init();
	angular.bootstrap(document,['myApp']);
	update.init();
	background.init();
	rightbar.init();
	music.init();
});