(function(){
    'use strict'

    angular.module('mutantApp.home')
        .controller('HomeController', HomeControllerFunction);

    HomeControllerFunction.$inject = ['auth'];
    function HomeControllerFunction(){
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;

        ////////////////
    }
})();
