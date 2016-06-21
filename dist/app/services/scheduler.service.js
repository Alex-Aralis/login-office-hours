(function(){
    angular.module('mutantApp.services.core')
        .factory('scheduler', schedulerFactory);

    schedulerFactory.$inject = [];
    function schedulerFactory(){
        var scheduler =  {
            mutantArray: [],
            addMutant: addMutant,
        }
        return scheduler;

        //////////////////

        function addMutant(mutant){
            scheduler.mutantArray.push(mutant);
            return 
        }
    }
})();
