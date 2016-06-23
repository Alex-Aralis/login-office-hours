(function(){
    'use strict'

    angular.module('mutantApp.home')
        .config(homeRouteConfigFunction);

    homeRouteConfigFunction.$inject = ['$stateProvider'];
    function homeRouteConfigFunction($stateProvider){
        $stateProvider
        
        .state('shell.home',{
            parent: 'shell',
            url:'/home',
            templateUrl: 'app/home/home.html',
        });        
    }
})();
