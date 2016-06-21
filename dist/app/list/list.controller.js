(function(){
    'use strict'

    angular.module('mutantApp.list')
        .controller('listController', listControllerFunction);

    listControllerFunction.$inject = ['scheduler'];
    function listControllerFunction(scheduler){
        var vm = this;

        console.log('before');
        console.log(scheduler);
        console.log('after');
        
        vm.inputMutant = new Mutant();
        vm.mutantArray = scheduler.mutantArray;
        vm.addMutant = addMutant;
        
        ////////////
   
        function Mutant(){
            this.name = '';
            this.topic = '';
            this.notified = false;
            this.phone = '';
        };
     
        function addMutant(){
            scheduler.addMutant(vm.inputMutant);
            vm.inputMutant = new Mutant();
        }
    }
})();
