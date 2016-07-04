(function(){
    'use strict'

    angular.module('mutantApp.registry')
        .controller('RegistryController', registryControllerFunction);

    registryControllerFunction.$inject = ['$firebaseArray', 'firebaseData', 'th'];
    function registryControllerFunction($firebaseArray, firebaseData, th){
        var vm = this;
        
        vm.orderByExp = '-';
        vm.users = $firebaseArray(firebaseData.users);
        vm.ths = [
            new th.Th({
                innerText: 'Name',
                orderByExp: 'info.displayName',
            }),
            new th.Th({
                innerText: 'Email',
                orderByExp: 'info.email',
            }),
        ]

    }
})();
