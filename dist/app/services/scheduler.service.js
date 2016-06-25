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
        }

        return scheduler;

        function Mutant(){
            this.name = '';
            this.topic = '';
            this.notified = false;
            this.phone = '';
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
    }
})();
