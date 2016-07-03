(function(){
    'use strict'

    console.log(appMutantDeps);
    
    angular.module('mutantApp', appMutantDeps)

    .config(['$urlRouterProvider', function configFunction($urlRouterProvider){
        $urlRouterProvider.otherwise('/home');
    }])
    .run(runFunction);

    ////////////////////////////

    runFunction.$inject = ['$state', '$rootScope', 'scheduler', 'auth', 'hacks'];

    function runFunction($state, $rootScope, scheduler, auth, hacks){
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){
            console.log( event, toState, toParams, fromState, fromParams);            
            if(fromState.name === 'list'){
                console.log('resetting scheduler');
                scheduler.reset();
            }
        });

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
