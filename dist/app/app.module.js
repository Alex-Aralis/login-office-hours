(function(){
    'use strict'

    console.log(appMutantDeps);
    
    angular.module('mutantApp', appMutantDeps)

    .config(['$urlRouterProvider', function configFunction($urlRouterProvider){
        $urlRouterProvider.otherwise('/home');
    }])

    .run(['$state', function runFunction($state){
        $state.go('home');
        
    }]);

})();
