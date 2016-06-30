(function(){
    'use strict'

    angular.module('mutantApp.template')
        .config(templateRouteConfigFunction);

    templateRouteConfigFunction.$inject = ['$stateProvider'];
    function templateRouteConfigFunction($stateProvider){
        $stateProvider

        .state('template',{
            parent: 'navbar',
            url: '/template',
            templateUrl: 'app/template/template.html',
            controller: 'TemplateController'
            controllerAs: 'vm',
        });
    }
})();
