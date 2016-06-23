(function(){
    'use strict'

    angular.module('mutantApp.shell')
        .config(shellRouteConfigFunction);

    shellRouteConfigFunction.$inject = ['$stateProvider'];
    function shellRouteConfigFunction($stateProvider){
        $stateProvider

        .state('shell',{
            abstract: true,
            templateUrl: 'app/shell/shell.html',
            controller: 'ShellNavbarController',
            controllerAs: 'vm',
        });
    }
})();
