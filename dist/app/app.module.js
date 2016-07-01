(function(){
    'use strict'

    console.log(appMutantDeps);
    
    angular.module('mutantApp', appMutantDeps)

    .config(['$urlRouterProvider', function configFunction($urlRouterProvider){
        $urlRouterProvider.otherwise('/home');
    }])
    .run(runFunction);

    ////////////////////////////

    runFunction.$inject = ['$state', '$rootScope', 'firebaseData', 'auth'];

    function runFunction($state, $rootScope, firebaseData, auth){
        $rootScope.$on('$stateChangeError',
            function(event, toState, fromState, fromParams, error){
                $state.go('home');
            }
        );

        auth.authObj.$onAuthStateChanged(function(){
            firebaseData.safeDigest($rootScope);
        });
    };

})();
