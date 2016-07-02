(function(){
    'use strict'

    angular.module('mutantApp.services.core')
        .factory('auth', authFactory);

    authFactory.$inject = [
        '$rootScope', 
        '$q', 
        '$firebaseAuth', 
        'firebaseData', 
        'scheduler', 
        'gravatarData', 
        'hacks'
    ];

    function authFactory($rootScope, $q, $firebaseAuth, firebaseData, scheduler, gravatarData, hacks){
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
            updateUser: updateUser,
            updatePublicUserInfo: updatePublicUserInfo,
        }; 

        return service;

        function User(){
            this.email = '';
            this.password = '';
        }

        ///////////////////////

        fauth.$onAuthStateChanged($rootScope.$digest);

        function updatePublicUserInfo(user, info){
            console.log(info);
            console.log(user);

            var infoRef = firebaseData.users.child(user.uid).child('info');

            if(info.email){infoRef.child('email').set(info.email);}
            if(info.displayName){infoRef.child('displayName').set(info.displayName);}
            if(info.phone){infoRef.child('phone').set(info.phone);}
        }

        function updateUser(info){
            return $q(function(res, rej){
                service.getUser()
                    .then(function(user){
                        console.log('updateUser has started');
                        var profileInfo = {
                            photoURL:info.photoURL,
                            displayName: info.displayName,
                        }

                        if(profileInfo.photoURL === undefined){delete profileInfo.photoURL}
                        if(profileInfo.dispalyName){delete profile.displayName}

                        console.log(profileInfo);
                        user.updateProfile(profileInfo)
                            .then(function(){
                                console.log(user);
                                console.log(info);
                                service.updatePublicUserInfo(user, info);
                                res(user);
                            }).catch(rej);
                    }).catch(rej);
            });
        }

        function register(newUser){
            console.log(newUser);
            return fauth.$createUserWithEmailAndPassword(newUser.email, newUser.password)
                .then(function(user){
                    console.log(user);
                    
                    user.sendEmailVerification();
                
                    gravatarData.json(user.email)
                        .then(function(res){
                            console.log(res);
                            
                            var info = {
                                email: user.email,
                                photoURL: gravatarData.getUrl(user.email, {backup: 'identicon'}),
                            };

                            if(res && res.data && res.data.entry){
                                var gravatarUser = res.data.entry[0];
                                console.log(gravatarUser);
                                 
                                info.displayName = gravatarUser.displayName;
                            }

                            console.log(info);
                            service.updateUser(info)
                                .then(hacks.safeDigest);

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
