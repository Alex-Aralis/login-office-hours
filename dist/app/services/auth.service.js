(function(){
    'use strict'

    angular.module('mutantApp.services.core')
        .factory('auth', authFactory);

    authFactory.$inject = ['$q', '$firebaseAuth', 'scheduler'];
    function authFactory($q, $firebaseAuth, scheduler){
        var fauth = $firebaseAuth();
       
        var service = {
            authObj: fauth,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            getUser: getUser,
            getNoUser: getNoUser,
            User: User,
        }; 

        return service;

        function User(){
            this.email = '';
            this.password = '';
        }

        ///////////////////////

        fauth.$onAuthStateChanged($scope.$digest);

        function register(newUser){
            console.log(newUser);
            return fauth.$createUserWithEmailAndPassword(newUser.email, newUser.password)
                .then(function(user){
                    console.log(user);
                    user.updateProfile({
                        displayName: newUser.displayName,
                    }).then(function(setUser){
                        console.log(service.isLoggedIn());
                    });
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

        function getNoUser(){
            return $q(function(resolve, reject){
                fauth.$requireSignIn()
                    .then(function(){
                        reject('user is logged in');
                    })
                    .catch(function(){
                        resolve('user is not logged in');
                    });
            });
        }
    }
})();
