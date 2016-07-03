(function(){
    'use strict'

    angular.module('mutantApp.list')
        .controller('listController', listControllerFunction);

    listControllerFunction.$inject = ['$stateParams', 'scheduler', 'user'];
    function listControllerFunction($stateParams, scheduler, user){
        var vm = this;

        vm.user = user;        
        vm.urlUser = {uid: $stateParams.uid};
        vm.inputMutant = new scheduler.Mutant();
        vm.mutants = scheduler.getMutantsOfUser(vm.urlUser);

    }
})();
