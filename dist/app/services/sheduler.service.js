(function(){
    var moduleName = 'mutantApp.scheduler';

    appMutantDeps.push(moduleName);    

    angular.module(moduleName, [])
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
