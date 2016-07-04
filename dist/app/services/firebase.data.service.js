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
            getUnfinishedUserMutantsRef: getUnfinishedUserMutantsRef,
            getUnnotifiedUserMutantsRef: getUnnotifiedUserMutantsRef,
            getUserRef: getUserRef,
        }

        return firebaseData;

        //////////////////
        function getUserRef(uid){
            return firebaseData.users.child(uid)
        }

        function getUserMutantsRef(uid){
            return getUserRef(uid).child('mutants');
        }

        function getUnfinishedUserMutantsRef(uid){
            return firebaseData.getUserMutantsRef(uid).orderByChild('isComplete').equalTo(false);
        }

        function getUnnotifiedUserMutantsRef(uid){
            return firebaseData.getUserMutantsRef(uid).orderByChild('notified').equalTo(false);
        }
    }
})();
