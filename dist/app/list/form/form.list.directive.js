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
                    inputMutants: '=',
                    user: '=',
                },
            };
        }

        ListFormDirectiveController.$inject = ['scheduler'];
        function ListFormDirectiveController(scheduler){
            var vm = this;

            vm.addMutant = addMutant;
            
            ////////////
       
            function addMutant(){
                scheduler.addMutantToUser(vm.inputMutant, vm.user);
                vm.inputMutant = new scheduler.Mutant();
            }
        }
})();
