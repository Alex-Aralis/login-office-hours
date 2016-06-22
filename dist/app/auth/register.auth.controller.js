(function(){
    'use strict'

    angular.module('mutantApp.auth')
        .controller('RegisterController', authControllerFunction);

    authControllerFunction.$inject = ['$firebaseAuth'];
    function authControllerFunction($firebaseAuth){
        console.log('running register controller');

        var vm = this;
        
        var auth = $firebaseAuth();
        vm.newUser = new User();
        vm.register = register;

        function User(){
            this.email = '';
            this.password = '';
        }


        ///////////////////////


        function register(){
            var p = auth.$createUserWithEmailAndPassword(vm.newUser.email, vm.newUser.password)

            .then(function(user){
                console.log(user);
            })

            .catch(function(error){
                console.log(error);
            });
        
            vm.newUser = new User();

            return p;
        }

        function login(user){
            return auth.$signInWithEmailAndPassword(user.email, user.password)

            .then(function(user){
                console.log(user);
            })

            .catch(function(error){
                console.log(error);
            });
        }
        
    }
})();
