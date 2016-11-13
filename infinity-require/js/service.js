define(['app'],function(app){
	// 控制器通信服务
	app.factory('Service',function($rootScope){
		var data = $rootScope.$new();
		return {
			data:data
		}
	})
})