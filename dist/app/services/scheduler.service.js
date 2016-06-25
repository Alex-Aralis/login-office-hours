(function(){
    angular.module('mutantApp.services.core')
        .factory('scheduler', schedulerFactory);

    schedulerFactory.$inject = ['$firebaseArray', 'firebaseData'];
    function schedulerFactory($firebaseArray, firebaseData){
        var scheduler =  {
            Mutant: Mutant,
            getMutantsOfUser: getMutantsOfUser,
            addMutantToUser: addMutantToUser,
            updateMutantInMutants: updateMutantInMutants,
            deleteMutantFromMutants: deleteMutantFromMutants,
        }

        return scheduler;

        function Mutant(){
            this.name = '';
            this.phone = '';
            this.topic = '';
            this.notified = false;
            this.isComplete = false;
        };
     
        //////////////////

        function getMutantsOfUser(user){
            return $firebaseArray(firebaseData.users.child(user.uid).child('mutants'));
        }

        function addMutantToUser(mutant, user){
            return scheduler.getMutantsOfUser(user).$add(mutant)
        }

        function updateMutantInMutants(mutant, mutants){
            return mutants.$save(mutant);
        }

        function deleteMutantFromMutants(mutant, mutants){
            return mutants.$remove(mutant);
        }
    }
})();
