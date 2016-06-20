(function(){
    'use strict'

    angular.module('mutantApp.home')
        .config(homeRouteConfigFunction);

    homeRouteConfigFunction.$injector = ['$stateProvider'];
    function templateConfigFunction($stateController){
        $stateProvider
        
        .state('mutantApp.home',{
            url:'/',
            templateUrl:'',
        });        
    }
})();
