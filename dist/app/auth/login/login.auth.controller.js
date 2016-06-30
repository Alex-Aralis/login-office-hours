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
                console.log('being thened');
                console.log(err, ret);
                vm.error = null;
                $state.go('list');
            })
            .catch(function(err){
                console.log('being caught');
                vm.error = err;
            });
        }
    }
})();
