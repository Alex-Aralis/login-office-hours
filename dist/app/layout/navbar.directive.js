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

    
    NavbarController.$inject = ['$scope','auth'];
    function NavbarController($scope, auth){
        var vm = this;

        vm.logout = logout;
        vm.isLoggedIn = auth.isLoggedIn;
       
        ///////////////
       
        auth.authObj.$onAuthStateChanged(function(){digest($scope, auth.logout);});
 
        function digest(scope, func){
            try
                {scope.$digest();}
            catch (e)
                {console.log(e);}
        }

        function logout(){
            auth.logout();
        }
    }
})();
