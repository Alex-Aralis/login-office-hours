(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .controller('LoginController', loginAuthControllerFunction);

    loginAuthControllerFunction.$inject = ['auth', '$state'];
    function loginAuthControllerFunction(auth, $state){
        var vm = this;
        
        vm.login = login;
        vm.error = null;

        ///////////////////////

        function login(user){
            auth.login(user)
            .then(function(err, ret){
                vm.error = null;
                $state.go('list', {uid: auth.isLoggedIn().uid});
            })
            .catch(function(err){
                vm.error = err;
            });
        }
    }
})();
