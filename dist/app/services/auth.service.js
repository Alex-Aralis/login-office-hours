(function(){
    'use strict'

    angular.module('mutantApp.services.core')
        .factory('auth', authFactory);

    authFactory.$inject = ['$firebaseAuth'];
    function authFactory($firebaseAuth){
        var fauth = $firebaseAuth();
       
        var service = {
            register: register,
            login: login,
        } 

        return service;

        function User(){
            this.email = '';
            this.password = '';
        }

        ///////////////////////


        function register(user){
            return fauth.$createUserWithEmailAndPassword(user.email, user.password)

            .then(function(ret){
                console.log(ret);
            })

            .catch(function(error){
                console.log(error);
            });
        }

        function login(user){
            return fauth.$signInWithEmailAndPassword(user.email, user.password)

            .then(function(ret){
                console.log(ret);
            })

            .catch(function(error){
                console.log(error);
            });
        }
    }
})();
