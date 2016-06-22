(function(){
    angular.module('mutantApp.services.core')
        .factory('scheduler', schedulerFactory);

    schedulerFactory.$inject = ['$firebaseArray'];
    function schedulerFactory($firebaseArray){
        var mutantsRef = firebase.database().ref().child('mutantArray');

        var scheduler =  {
            mutantArray: $firebaseArray(mutantsRef),
            addMutant: addMutant,
        }
        return scheduler;

        //////////////////

        function addMutant(mutant){
            
            scheduler.mutantArray.$add(mutant);
            return 
        }
    }
})();
