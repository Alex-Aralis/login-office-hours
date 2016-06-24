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
        vm.sendTextTo = sendTextTo;
        
        ////////////
   
        function addMutant(){
            scheduler.addMutant(vm.inputMutant);
            vm.inputMutant = new scheduler.Mutant();
        }

        function sendTextTo(mutant){
            console.log(mutant);

            console.log(new texter.Text({
                name: mutant.name,
                topic: mutant.topic,
                phone: mutant.phone,
            }));

            texter.send(new texter.Text({
                name: mutant.name,
                topic: mutant.topic,
                phone: mutant.phone,
            }))
            .then(function(ret){
                mutant.notified = true;
                scheduler.updateMutant(mutant);
            })
            .catch(function(err){
                console.log('send text failed');
                console.log(err);
            });
        }
    }
})();
