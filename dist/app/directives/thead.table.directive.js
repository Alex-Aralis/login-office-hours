(function(){
    'use strict'

    angular
        .module('mutantApp.directives.table')
        .directive('aaThead', aaThead);

    function aaThead(){
        return {
            templateUrl: 'app/directives/thead.table.directive.html',
            restrict: 'A',
            controller: TheadDirectiveController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                ths: '=',
                orderByExp: '=',
                privlaged: '@',
            },
        };
    }

    TheadDirectiveController.$inject = ['th'];
    function TheadDirectiveController(th){
        var vm = this;
        
        console.log('trying to set private');
        vm.onThClick = onThClick;
        
        ////////////

        function onThClick(index){
            vm.orderByExp = th.getOrderByExp(index, vm.ths);
        }
    }
})();
