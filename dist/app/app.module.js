(function(){
    'use strict'

    console.log(appMutantDeps);
    
    angular.module('mutantApp', appMutantDeps).run(['$state', function($state){
        $state.go('home');
    }]);
})();
