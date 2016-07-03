(function(){
    'use strict'

    angular.module('mutantApp.list')
        .controller('listController', listControllerFunction);

    listControllerFunction.$inject = ['$stateParams', 'scheduler'];
    function listControllerFunction($stateParams, scheduler){
        var vm = this;

        vm.urlUser = {uid: $stateParams.uid};
        vm.inputMutant = new scheduler.Mutant();
        vm.mutants = scheduler.getMutantsOfUser(vm.urlUser);

    }
})();
