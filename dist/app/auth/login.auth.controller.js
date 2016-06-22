(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .controller('LoginController', loginAuthControllerFunction);

    loginAuthControllerFunction.$inject = ['auth', '$state'];
    function loginAuthControllerFunction(auth, $state){
        var vm = this;
        
        vm.oldUser = new User();
        vm.login = login;

        function User(){
            this.email = '';
            this.password = '';
        }

        ///////////////////////

        function login(){
            auth.login(vm.oldUser);
            $state.go('home');  
        }
        
    }
})();
