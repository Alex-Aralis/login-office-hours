(function(){
    'use strict'

    angular
        .module('mutantApp.list')
        .directive('aaListForm', aaListForm);

        function aaListForm(){
            return {
                templateUrl: 'app/list/form/form.list.html',
                restrict: 'E',
                controller: ListFormDirectiveController,
                controllerAs: 'vm',
                bindToController: true,
                scope: {
                    inputMutant: '=',
                    user: '=',
                },
            };
        }

        ListFormDirectiveController.$inject = ['scheduler', 'auth'];
        function ListFormDirectiveController(scheduler, auth){
            var vm = this;

            vm.addMutant = addMutant;
            
            ////////////
       
            function addMutant(){
                scheduler.addMutantToUser(vm.inputMutant, vm.user);
                vm.inputMutant = new scheduler.Mutant();
            }
        }
})();
