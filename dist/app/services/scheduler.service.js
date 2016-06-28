(function(){
    angular.module('mutantApp.services.core')
        .factory('scheduler', schedulerFactory);

    schedulerFactory.$inject = ['$state', '$firebaseArray', 'firebaseData'];
    function schedulerFactory($state, $firebaseArray, firebaseData){
        var scheduler =  {
            Mutant: Mutant,
            getMutantsOfUser: getMutantsOfUser,
            addMutantToUser: addMutantToUser,
            updateMutantInMutants: updateMutantInMutants,
            deleteMutantFromMutants: deleteMutantFromMutants,
            reset: reset,
            mutants: null,
        };

        return scheduler;

        function Mutant(){
            this.name = '';
            this.phone = '';
            this.topic = '';
            this.notified = false;
            this.isComplete = false;
        };

        //////////////////

        function reset(){
            if (scheduler.mutants){
                $state.go('home');
                scheduler.mutants.$destroy();
                scheduler.mutants = null;
            }
        }

        function getMutantsOfUser(user){
            return scheduler.mutants = scheduler.mutants || 
                $firebaseArray(firebaseData.users.child(user.uid).child('mutants'));
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
