(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .config(authRouteConfigFunction);

    authRouteConfigFunction.$inject = ['$stateProvider'];
    function authRouteConfigFunction($stateProvider){
        $stateProvider

        .state('shell.register',{
            parent: 'shell',
            url: '/register',
            templateUrl: 'app/auth/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm',
        })
        .state('shell.login', {
            parent: 'shell',
            url: '^/login',
            templateUrl: 'app/auth/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
        });
    }
})();
