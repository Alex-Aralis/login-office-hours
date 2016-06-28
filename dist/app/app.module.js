(function(){
    'use strict'

    console.log(appMutantDeps);
    
    angular.module('mutantApp', appMutantDeps)

    .config(['$urlRouterProvider', function configFunction($urlRouterProvider){
        $urlRouterProvider.otherwise('/home');
    }])

    .run(['$state', '$rootScope', function runFunction($state, $rootScope){
        $rootScope.$on('$stateChangeError',
            function(event, toState, fromState, fromParams, error){
                $state.go('home');
            }
        );
    }]);

})();
