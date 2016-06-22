(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .config(authRouteConfigFunction);

    authRouteConfigFunction.$inject = ['$stateProvider'];
    function authRouteConfigFunction($stateProvider){
        $stateProvider

        .state('register',{
            url: '/register',
            templateUrl: 'app/auth/auth.html',
            controller: 'mutantApp.auth.controller',
            controllerAs: 'vm',
        });
    }
})();
