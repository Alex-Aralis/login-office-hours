(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .controller('RegisterController', RegisterAuthControllerFunction);

    RegisterAuthControllerFunction.$inject = ['auth'];
    function RegisterAuthControllerFunction(auth){
        var vm = this;
        
        vm.newUser = new auth.User();
        vm.register = register;

        ///////////////////////


        function register(){
            auth.register(vm.newUser)
            vm.newUser = new auth.User();
        }
        
    }
})();
