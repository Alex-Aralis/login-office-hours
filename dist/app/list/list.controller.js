(function(){
    'use strict'

    angular.module('mutantApp.list')
        .controller('listController', listControllerFunction);

    listControllerFunction.$inject = ['scheduler', 'texter', 'user'];
    function listControllerFunction(scheduler, texter, user){
        var vm = this;

        vm.user = user;        
        vm.inputMutant = new scheduler.Mutant();
        vm.mutants = scheduler.getMutantsOfUser(user);

    }
})();
