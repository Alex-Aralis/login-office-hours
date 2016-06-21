(function(){
    'use strict'

    angular.module('mutantApp.template')
        .config(templateRouteConfigFunction);

    templateRouteConfigFunction.$inject = ['$stateProvider'];
    function templateConfigFunction($stateProvider){
        $stateProvider

        .state('template',{
            url: '/template',
            templateUrl: 'template',
            controller: 'mutantApp.template.controller',
            controllerAs: 'vm',
        });
    }
})();
