(function(){
    angular.module('mutantApp.services.core')
        .factory('scheduler', schedulerFactory);

    schedulerFactory.$inject = ['$firebaseArray', 'firebaseData'];
    function schedulerFactory($firebaseArray, firebaseData){
        var scheduler =  {
            Mutant: Mutant,
            mutantArray: $firebaseArray(firebaseData.schedule),
            addMutant: addMutant,
            updateMutant: updateMutant,
        }

        return scheduler;

        function Mutant(){
            this.name = '';
            this.topic = '';
            this.notified = false;
            this.phone = '';
        };
     
        //////////////////

        function addMutant(mutant){
            
            scheduler.mutantArray.$add(mutant);
        }

        function updateMutant(mutant){
            mutantArray.$save(mutant);
        }
    }
})();
