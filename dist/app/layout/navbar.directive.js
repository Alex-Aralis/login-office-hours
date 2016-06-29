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

    
    NavbarController.$inject = ['$scope','auth', 'firebaseData'];
    function NavbarController($scope, auth, firebaseData){
        var vm = this;

        vm.logout = logout;
        vm.isLoggedIn = auth.isLoggedIn;
       
        ///////////////
       
        auth.authObj.$onAuthStateChanged(
            function(){
                firebaseData.safeDigest($scope);
            }
        );

        function logout(){
            auth.logout();
        }
    }
})();
