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
                passwordReset: '@',
            },
        };
    }

    AuthFormDirectiveController.$inject = ['$scope', 'auth', 'hacks'];
    function AuthFormDirectiveController($scope, auth, hacks){
        var vm = this;

        vm.user = new auth.User();
        vm.wrappedSubmitFunction = wrappedSubmitFunction;
        vm.sendPasswordResetEmail = sendPasswordResetEmail;
        vm.passwordResetEmailSent = false;
        vm.clearForm = clearForm;
        vm.resetMessages = resetMessages;

        ////////////

        function sendPasswordResetEmail(email){
            resetMessages();

            auth.sendPasswordResetEmail(email)
                .then(function(){
                    vm.passwordResetEmailSent = email;
                })
                .catch(function(err){
                    vm.error = err;
                });
        }

        function wrappedSubmitFunction(){
            vm.submitFunction({user: vm.user});
            if($scope.form.$valid){
                clearForm();
            }else{
                vm.error = null;
            }
        }
        
        function resetMessages(){
            $scope.form.$setPristine();
            hacks.safeDigest($scope);
            vm.error = null;
            vm.passwordResetEmailSent = false;
        }

        function clearForm(){
            vm.inputUser = new auth.User();
            vm.showPassword = false;
            resetMessages();
        }
    }
})();
