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
        vm.unfinishedMutants = scheduler.getUnfinishedMutantsOfUser(vm.urlUser);
        vm.listToShow = 'all';
        vm.onTabButtonClick = onTabButtonClick;
        vm.buttons = [
            {
                innerText: 'All Messages',
                list: 'all',
                active: true,
            },
            {
                innerText: 'Unfinished',
                list: 'unfinished',
                active: false,
            },
        ]

        ////////////////////////
    
        function onTabButtonClick(index){
            vm.buttons.forEach(function(button, i){
                if(i === index){
                    vm.listToShow = button.list;
                    button.active = true;
                }else{
                    button.active = false;
                }
            });
        }
    }
})();
