(function(){
    'use strict'

    angular
        .module('mutantApp.list')
        .directive('aaListTable', aaList);

        function aaList(){
            return {
                templateUrl: 'app/list/table.list.html',
                restrict: 'E',
                controller: ListTableDirectiveController,
                controllerAs: 'vm',
                bindToController: true,
                scope: {
                    mutants: '=',
                    user: '=',
                },
            };
        }

        ListTableDirectiveController.$inject = ['texter', 'scheduler'];
        function ListTableDirectiveController(texter, scheduler){
            var vm = this;

            vm.deleteMutant = deleteMutant;
            vm.toggleComplete = toggleComplete;
            vm.sendTextTo = sendTextTo;

            ////////////

            function deleteMutant(mutant){
                scheduler.deleteMutantFromMutants(mutant, vm.mutants);
            }

            function toggleComplete(mutant){
                mutant.isComplete = !mutant.isComplete;
                scheduler.updateMutantInMutants(mutant, vm.mutants);
            }

            function sendTextTo(mutant){
                texter.send(new texter.Text({
                    name: mutant.name,
                    topic: mutant.topic,
                    phone: mutant.phone,
                }));
            }
        }
})();
