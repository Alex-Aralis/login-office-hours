(function (){
    'use strict';

    angular
        .module('mutantApp.layout')
        .directive('aaNavbar', aaNavbar);

    function aaNavbar(){
        return {
            templateUrl: 'app/layout/navbar.html',
            restrict: 'E',
            controller: NavbarController,
            controllerAs: 'vm',
            scope: {},
        };
    }

    
    NavbarController.$inject = ['auth'];
    function NavbarController(auth){
        var vm = this;

        vm.logout = auth.logout;
        vm.isLoggedIn = auth.isLoggedIn;
        
    }
})();
