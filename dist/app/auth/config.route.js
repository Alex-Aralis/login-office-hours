(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .config(authRouteConfigFunction);

    authRouteConfigFunction.$inject = ['$stateProvider'];
    function authRouteConfigFunction($stateProvider){
        $stateProvider

        .state('register',{
            url: '/register',
            templateUrl: 'app/auth/register/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm',
            resolve:{
                noUser: resolveNoUser,
            },
        })
        .state('login', {
            url: '^/login',
            templateUrl: 'app/auth/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            resolve:{
                noUser: resolveNoUser,
            },
        });

        resolveNoUser.$inject = ['auth'];
        function resolveNoUser(auth){
            return auth.getNoUser();
        }
    }
})();
