(function(){
    'use strict'

    angular.module('mutantApp.registry')
        .controller('RegistryController', registryControllerFunction);

    registryControllerFunction.$inject = ['$firebaseArray', 'firebaseData'];
    function registryControllerFunction($firebaseArray, firebaseData){
        var vm = this;
        
        vm.users = $firebaseArray(firebaseData.users);

    }
})();
