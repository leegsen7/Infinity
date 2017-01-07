define(function(require){
	var angular = require('angular');
	var ngRoute = require('angular-route');
	var ngAnimate = require('angular-animate');
	var toastr = require('angular-toastr');
	var ngPage = require('angular-page');
	
	var app =  angular.module('myApp',['ngRoute','ngAnimate','toastr','ngPage']);
	return app;
});