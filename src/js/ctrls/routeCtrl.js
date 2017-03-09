define(function(require){
	var app = require('app');
	
	app.controller('appCtrl',['$scope','getApi',function($scope,getApi){
		var promise = getApi.apiData;
		promise.then(function(data){
			$scope.items = data.labelList.app;
		})
	}]);
	
	app.controller('musicCtrl',['$scope','getApi',function($scope,getApi){
		var promise = getApi.apiData;
		promise.then(function(data){
			$scope.items = data.labelList.music;
		})
	}]);
	
	app.controller('eduCtrl',['$scope','getApi',function($scope,getApi){
		var promise = getApi.apiData;
		promise.then(function(data){
			$scope.items = data.labelList.edu;
		})
	}]);
	
	app.controller('gameCtrl',['$scope','getApi',function($scope,getApi){
		var promise = getApi.apiData;
		promise.then(function(data){
			$scope.items = data.labelList.game;
		})
	}]);
	
	app.controller('tecCtrl',['$scope','getApi',function($scope,getApi){
		var promise = getApi.apiData;
		promise.then(function(data){
			$scope.items = data.labelList.tec;
		})
	}]);
	
	app.controller('blogCtrl',['$scope','getApi',function($scope,getApi){
		var promise = getApi.apiData;
		promise.then(function(data){
			$scope.items = data.labelList.blog;
		})
	}]);
	
	app.controller('sportCtrl',['$scope','getApi',function($scope,getApi){
		var promise = getApi.apiData;
		promise.then(function(data){
			$scope.items = data.labelList.sport;
		})
	}]);
	
	app.controller('shopCtrl',['$scope','getApi',function($scope,getApi){
		var promise = getApi.apiData;
		promise.then(function(data){
			$scope.items = data.labelList.shop;
		})
	}]);
	
	app.controller('picCtrl',['$scope','getApi',function($scope,getApi){
		var promise = getApi.apiData;
		promise.then(function(data){
			$scope.items = data.labelList.pic;
		})
	}]);
	
	app.controller('newsCtrl',['$scope','getApi',function($scope,getApi){
		var promise = getApi.apiData;
		promise.then(function(data){
			$scope.items = data.labelList.news;
		})
	}]);
})