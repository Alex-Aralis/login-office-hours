(function(){
    'use strict'

    angular
        .module('mutantApp.auth')
        .directive('aaAuthForm', aaAuthForm);

    function aaAuthForm(){
        return {
            templateUrl: 'app/auth/form.auth.directive.html',
            restrict: 'E',
            controller: AuthFormDirectiveController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                formButtonText: '@',
                formTitle: '@',
                submitFunction: '&',
                error: '=',
            },
        };
    }

    AuthFormDirectiveController.$inject = ['$scope', 'auth'];
    function AuthFormDirectiveController($scope, auth){
        var vm = this;

        vm.user = new auth.User();
        vm.wrappedSubmitFunction = wrappedSubmitFunction;

        ////////////

        function wrappedSubmitFunction(){
            vm.submitFunction({user: vm.user});
            if($scope.form.$valid){
                vm.user = new auth.User();
            }else{
                vm.error = null;
            }
        }
    }
})();
