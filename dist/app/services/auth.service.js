(function(){
    'use strict'

    angular.module('mutantApp.services.core')
        .factory('auth', authFactory);

    authFactory.$inject = ['$firebaseAuth', 'scheduler'];
    function authFactory($firebaseAuth, scheduler){
        var fauth = $firebaseAuth();
       
        var service = {
            authObj: fauth,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            getUser: getUser,
            User: User,
        }; 

        return service;

        function User(){
            this.email = '';
            this.password = '';
        }

        ///////////////////////

        fauth.$onAuthStateChanged($scope.$digest);

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
            return fauth.$signInWithEmailAndPassword(user.email, user.password);
        }

        function logout(){
            scheduler.reset();
            return fauth.$signOut();
        }

        function isLoggedIn(){
            return fauth.$getAuth();
        }

        function getUser(){
            return fauth.$requireSignIn();
        }
    }
})();
