(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .config(authRouteConfigFunction);

    authRouteConfigFunction.$inject = ['$stateProvider'];
    function authRouteConfigFunction($stateProvider){
        $stateProvider

        .state('register',{
            url: '/register',
            templateUrl: 'app/auth/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm',
        });
    }
})();
