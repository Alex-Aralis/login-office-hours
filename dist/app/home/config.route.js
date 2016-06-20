(function(){
    'use strict'

    angular.module('mutantApp.home')
        .config(homeRouteConfigFunction);

    homeRouteConfigFunction.$inject = ['$stateProvider'];
    function homeRouteConfigFunction($stateProvider){
        $stateProvider
        
        .state('home',{
            url:'/home',
            templateUrl: 'app/home/home.html',
            //templateUrl:'app/home/home.html',
        });        
    }
})();
