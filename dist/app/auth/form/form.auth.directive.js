(function(){
    'use strict'

    angular
        .module('mutantApp.auth')
        .directive('aaAuthForm', aaAuthForm);

    function aaAuthForm(){
        return {
            templateUrl: 'app/auth/form/form.auth.directive.html',
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

    AuthFormDirectiveController.$inject = ['$scope', 'auth', 'hacks'];
    function AuthFormDirectiveController($scope, auth, hacks){
        var vm = this;

        vm.user = new auth.User();
        vm.wrappedSubmitFunction = wrappedSubmitFunction;

        ////////////

        function wrappedSubmitFunction(){
            vm.submitFunction({user: vm.user});
            if($scope.form.$valid){
                vm.user = new auth.User();
                $scope.form.$setPristine();
                hacks.safeDigest($scope);
            }else{
                vm.error = null;
            }
        }
    }
})();
