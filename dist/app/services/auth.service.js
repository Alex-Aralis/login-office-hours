(function(){
    'use strict'

    angular.module('mutantApp.services.core')
        .factory('auth', authFactory);

    authFactory.$inject = ['$rootScope', '$q', 'firebaseData', '$firebaseAuth', 'scheduler', 'gravatarData'];
    function authFactory($rootScope, $q, firebaseData, $firebaseAuth, scheduler, gravatarData){
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
                    
                    user.sendEmailVerification();
                
                    gravatarData.json(user.email)
                        .then(function(res){
                            console.log(res);

                            try{
                                var gravatarUser = res.data.entry[0];
                                console.log(gravatarUser);

                                user.updateProfile({
                                    photoURL: gravatarData.getUrl(user.email, {backup: 'identicon'}),
                                    displayName: gravatarUser.displayName,
                                }).then(function(setUser){
                                    firebaseData.safeDigest($rootScope);
                                });
                            }catch(err){
                                user.updateProfile({
                                    photoURL: gravatarData.getUrl(user.email, {backup: 'identicon'}),
                                }).then(function(setUser){
                                    firebaseData.safeDigest($rootScope);
                                });
                                
                            }
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
