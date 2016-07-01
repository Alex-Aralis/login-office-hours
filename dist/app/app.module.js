(function(){
    'use strict'

    console.log(appMutantDeps);
    
    angular.module('mutantApp', appMutantDeps)

    .config(['$urlRouterProvider', function configFunction($urlRouterProvider){
        $urlRouterProvider.otherwise('/home');
    }])
    .run(runFunction);

    ////////////////////////////

    runFunction.$inject = ['$state', '$rootScope', 'auth', 'hacks'];

    function runFunction($state, $rootScope, auth, hacks){
        $rootScope.$on('$stateChangeError',
            function(event, toState, fromState, fromParams, error){
                $state.go('home');
            }
        );

        auth.authObj.$onAuthStateChanged(function(){
            hacks.safeDigest();
        });
    };

})();
