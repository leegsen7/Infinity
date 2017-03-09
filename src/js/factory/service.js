define(function(require){
	var app = require('app');

	// 控制器通信服务
	app.factory('Service',['$rootScope',function($rootScope){
		var data = $rootScope.$new();
		return {
			data:data
		}
	}]);

    app.service('getApi',['$http',"$q",function($http,$q){
		var defer = $q.defer(),apiData;

        $http.jsonp('http://leegsen7.cn:8080/api/infinity/?callback=JSON_CALLBACK').success(function(value){
            defer.resolve(value);
        });

        return {
        	apiData:defer.promise
        }
    }]);
})