(function(){
    angular.module('mutantApp.services.core')
        .factory('scheduler', schedulerFactory);

    schedulerFactory.$inject = ['$state', '$firebaseArray', 'firebaseData'];
    function schedulerFactory($state, $firebaseArray, firebaseData){
        var scheduler =  {
            Mutant: Mutant,
            getMutantsOfUser: getMutantsOfUser,
            getUnfinishedMutantsOfUser: getUnfinishedMutantsOfUser,
            getUnnotifiedMutantsOfUser: getUnnotifiedMutantsOfUser,
            addMutantToUser: addMutantToUser,
            updateMutantInMutants: updateMutantInMutants,
            deleteMutantFromMutants: deleteMutantFromMutants,
            reset: reset,
            mutants: null,
            unfinishedMutants: null,
            unnotifiedMutants: null,
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
                if( scheduler.mutants && scheduler.mutants.$destroy ){
                    scheduler.mutants.$destroy();
                }

                if( scheduler.unfinishedMutants && scheduler.unfinishedMutants.$destroy ){
                    scheduler.unfinishedMutants.$destroy();
                }

                if( scheduler.unnotifiedMutants && scheduler.unnotifiedMutants.$destroy ){
                    scheduler.unnotifiedMutants.$destroy();
                }

                scheduler.mutants = null;
                scheduler.unfinishedMutants = null;
                scheduler.unnotifiedMutants = null;
            }
        }

        function getUnfinishedMutantsOfUser(user){
            return scheduler.unfinishedMutants = scheduler.unfinishedMutants || 
                $firebaseArray(firebaseData.getUnfinishedUserMutantsRef(user));
        }

        function getUnnotifiedMutantsOfUser(user){
            return scheduler.unnotifiedMutants = scheduler.unnotifiedMutants || 
                $firebaseArray(firebaseData.getUnnotifiedUserMutantsRef(user));
        }

        function getMutantsOfUser(user){
            return scheduler.mutants = scheduler.mutants || 
                $firebaseArray(firebaseData.getUserMutantsRef(user));
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
