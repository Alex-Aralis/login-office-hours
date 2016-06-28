(function(){
    'use strict'

    angular.module('mutantApp.home')
        .config(homeRouteConfigFunction);

    homeRouteConfigFunction.$inject = ['$stateProvider'];
    function homeRouteConfigFunction($stateProvider){
        $stateProvider
        
        .state('home',{
            url:'/home',
            controller: 'HomeController',
            controllerAs: 'vm',
            templateUrl: 'app/home/home.html',
        });        
    }
})();
