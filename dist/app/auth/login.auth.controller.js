(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .controller('LoginController', loginAuthControllerFunction);

    loginAuthControllerFunction.$inject = ['auth', '$state'];
    function loginAuthControllerFunction(auth, $state){
        var vm = this;
        
        vm.oldUser = new auth.User();
        vm.login = login;

        ///////////////////////

        function login(){
            auth.login(vm.oldUser);
            $state.go('shell.home');  
        }
        
    }
})();
