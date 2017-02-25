require.config({
    baseUrl:'./src/js',
    paths:{
      // lib
      "angular":"libs/angular.min",
      "angular-route":"libs/angular-route.min",
      'angular-animate':'libs/angular-animate.min',
      "jquery":"libs/jquery.min",
      "angular-toastr":"libs/angular-toastr.min",
      "angular-page":"libs/angular-page",
      // dom
      'start':'dom/start',
      'background':'dom/background',
      'storage':'dom/storage',
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
            exports:"ngRoute",
        },
        'angular-animate':{
          deps:['angular'],
          exports:'ngAnimate',
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
})

require([
	'start',
	'angular',
	'background',
	'rightbar',
	'music',
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
	'route'],function(start,angular,background,rightbar,music){
	start.init();
	angular.bootstrap(document,['myApp']);
	background.init();
	rightbar.init();
	music.init();
});