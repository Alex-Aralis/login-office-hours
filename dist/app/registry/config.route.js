(function(){
    'use strict'

    angular.module('mutantApp.registry')
        .config(registryRouteConfigFunction);

    registryRouteConfigFunction.$inject = ['$stateProvider'];
    function registryRouteConfigFunction($stateProvider){
        $stateProvider

        .state('registry',{
            url: '/template',
            templateUrl: 'app/registry/registry.html',
            controller: 'RegistryController',
            controllerAs: 'vm',
        });
    }
})();
