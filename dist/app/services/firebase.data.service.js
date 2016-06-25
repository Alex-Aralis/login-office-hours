(function(){
    angular.module('mutantApp.services.core')
        .factory('firebaseData', firebaseDataFactory);

    firebaseDataFactory.$inject = [];
    function firebaseDataFactory(){
        var root = firebase.database().ref();

        var firebaseData =  {
            root: root,
            users: root.child('users'),
            texts: root.child('texts'),            
        }

        return firebaseData;

        //////////////////

    }
})();
