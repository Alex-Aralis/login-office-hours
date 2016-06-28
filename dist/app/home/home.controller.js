(function(){
    'use strict'

    angular.module('mutantApp.home')
        .controller('HomeController', HomeControllerFunction);

    HomeControllerFunction.$inject = ['auth'];
    function HomeControllerFunction(auth){
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;

        ////////////////
    }
})();
