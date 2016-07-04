(function(){
    'use strict'

    angular.module('mutantApp.list')
        .controller('listController', listControllerFunction);

    listControllerFunction.$inject = ['$stateParams', '$firebaseObject', 'auth', 'firebaseData', 'scheduler'];
    function listControllerFunction($stateParams, $firebaseObject, auth, firebaseData, scheduler){
        var vm = this;
        
        vm.urlUid = $stateParams.uid;
        vm.urlUser = $firebaseObject(firebaseData.getUserRef(vm.urlUid).child('info'));
        vm.inputMutant = new scheduler.Mutant();
        vm.mutants = scheduler.getMutantsOfUser(vm.urlUid);
        vm.unfinishedMutants = scheduler.getUnfinishedMutantsOfUser(vm.urlUid);
        vm.unnotifiedMutants = scheduler.getUnnotifiedMutantsOfUser(vm.urlUid);
        vm.listToShow = 'all';
        vm.onTabButtonClick = onTabButtonClick;
        vm.isLoggedIn = auth.isLoggedIn;
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
            {
                innerText: 'Unnotified',
                list: 'unnotified',
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
