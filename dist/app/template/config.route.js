(function(){
    'use strict'

    angular.module('mutantApp.template')
        .config(templateRouteConfigFunction);

    templateRouteConfigFunction.$injector = ['$stateProvider'];
    function templateConfigFunction($stateProvider){
        $stateProvider

        .state('mutantApp.template',{
            url: '/template',
            templateUrl: 'template',
            controller: 'mutantApp.template.controller',
            controllerAs: 'vm',
        });
    }
})();
