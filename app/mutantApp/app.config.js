(function(){
    'use strict'

    angular.module('mutantApp')
        .config(templateConfigFunction);

    templateConfigFunction.$injector = ['$stateProvider'];
    function templateConfigFunction($stateController){
        $stateProvider
        
    }
})();
