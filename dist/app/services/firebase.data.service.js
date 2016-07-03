(function(){
    angular.module('mutantApp.services.core')
        .factory('firebaseData', firebaseDataFactory);

    firebaseDataFactory.$inject = [];
    function firebaseDataFactory(){
        var root = firebase.database().ref();

        var firebaseData =  {
            root: root,
            users: root.child('users'),
            pendingTexts: root.child('texts').child('pending'),            
            processedTexts: root.child('texts').child('processed'),
            pendingEmails: root.child('emails').child('pending'),
            processedEmails: root.child('emails').child('processed'),
            getUserMutantsRef: getUserMutantsRef,
            getUnfinishedUserMutantsRef: getUnfinishedUserMutantsRef
        }

        return firebaseData;

        //////////////////

        function getUserMutantsRef(user){
            return firebaseData.users.child(user.uid).child('mutants');
        }

        function getUnfinishedUserMutantsRef(user){
            return firebaseData.getUserMutantsRef(user).orderByChild('isComplete').equalTo(false);
        }
    }
})();
