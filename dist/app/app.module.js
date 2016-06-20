(function(){
    'use strict'

    console.log(appMutantDeps);
    
    angular.module('mutantApp', appMutantDeps).run(['$state', function($state){
        console.log('run');
        $state.go('home');
    }]);
})();
