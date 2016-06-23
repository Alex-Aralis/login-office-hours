(function(){
    angular.module('mutantApp.services.core')
        .factory('firebaseData', firebaseDataFactory);

    firebaseDataFactory.$inject = [];
    function firebaseDataFactory(){
        var root = firebase.database().ref();

        var firebaseData =  {
            root: root,
            schedule: root.child('mutantArray'),
            texts: root.child('texts'),            
        }

        return firebaseData;

        //////////////////

    }
})();
