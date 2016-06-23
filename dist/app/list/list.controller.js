(function(){
    'use strict'

    angular.module('mutantApp.list')
        .controller('listController', listControllerFunction);

    listControllerFunction.$inject = ['scheduler', 'texter'];
    function listControllerFunction(scheduler, texter){
        var vm = this;
        
        vm.inputMutant = new scheduler.Mutant();
        vm.mutantArray = scheduler.mutantArray;

        vm.addMutant = addMutant;
        vm.sendText = sendText;
        
        ////////////
   
        function addMutant(){
            scheduler.addMutant(vm.inputMutant);
            vm.inputMutant = new scheduler.Mutant();
        }

        function sendText(mutant){
            texter.send(new texter.Text({
                name: mutant.name,
                topic: mutant.topic,
                phone: mutant.phone,
            }))
            .then(function(){
                mutant.notified = true;
                scheduler.updateMutant(mutant);
            })
            .catch(function(){
                console.log('send text failed');
            });
        }
    }
})();
