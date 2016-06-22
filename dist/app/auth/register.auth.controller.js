(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .controller('RegisterController', RegisterAuthControllerFunction);

    RegisterAuthControllerFunction.$inject = ['auth'];
    function RegisterAuthControllerFunction(auth){
        var vm = this;
        
        vm.newUser = new User();
        vm.register = register;

        function User(){
            this.email = '';
            this.password = '';
        }

        ///////////////////////


        function register(){
            auth.register(vm.newUser)
            vm.newUser = new User();
        }
        
    }
})();
