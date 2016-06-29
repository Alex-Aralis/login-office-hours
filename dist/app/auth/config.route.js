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
        })
        .state('login', {
            url: '^/login',
            templateUrl: 'app/auth/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            resolve:{
                noUser: resolveNoUser,
            }
        });

        resolveNoUser.$inject = ['auth', '$q'];
        function resolveNoUser(auth, $q){
            return $q(function(resolve, reject){
                auth.getUser()
                    .then(function(){
                        reject('user is logged in');
                    })
                    .catch(function(){
                        resolve('user is not logged in');
                    });
            });
        }
    }
})();
