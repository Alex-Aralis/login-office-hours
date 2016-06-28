(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .controller('RegisterController', RegisterAuthControllerFunction);

    RegisterAuthControllerFunction.$inject = ['$state','auth'];
    function RegisterAuthControllerFunction($state, auth){
        var vm = this;
        
        vm.newUser = new auth.User();
        vm.register = register;
        vm.error = null;

        ///////////////////////


        function register(){
            auth.register(vm.newUser)
            .then(function(err, ret){
                console.log('being thened');
                console.log(err,ret);
                vm.error = null;
                $state.go('home');
            })
            .catch(function(err){
                console.log('being caught');
                console.log(err);
                vm.error = err;
            });
            vm.newUser = new auth.User();
        }
        
    }
})();
