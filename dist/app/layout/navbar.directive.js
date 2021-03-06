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

    
    NavbarController.$inject = ['$rootScope','$state','auth', 'firebaseData'];
    function NavbarController($rootScope, $state, auth, firebaseData){
        var vm = this;

        vm.logout = logout;
        vm.isLoggedIn = auth.isLoggedIn;

        ///////////////
       
        function logout(){
            auth.logout();
            $state.go('home');
        }
        
    }
})();
