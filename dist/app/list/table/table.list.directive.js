(function(){
    'use strict'

    angular
        .module('mutantApp.list')
        .directive('aaListTable', aaList);

        function aaList(){
            return {
                templateUrl: 'app/list/table/table.list.html',
                restrict: 'E',
                controller: ListTableDirectiveController,
                controllerAs: 'vm',
                bindToController: true,
                scope: {
                    mutants: '=',
                    user: '=',
                },
            };
        }

        ListTableDirectiveController.$inject = ['$scope', '$rootScope', 'auth', 'texter', 'scheduler', 'hacks'];
        function ListTableDirectiveController($scope, $rootScope, auth, texter, scheduler, hacks){
            var vm = this;

            vm.deleteMutant = deleteMutant;
            vm.toggleComplete = toggleComplete;
            vm.sendTextTo = sendTextTo;
            vm.error = null;
            vm.isLoggedIn = auth.isLoggedIn;

            ////////////

            function deleteMutant(mutant){
                scheduler.deleteMutantFromMutants(mutant, vm.mutants);
            }

            function toggleComplete(mutant){
                mutant.isComplete = !mutant.isComplete;
                scheduler.updateMutantInMutants(mutant, vm.mutants);
            }

            function sendTextTo(mutant){
                texter.send(new texter.Text({
                    name: mutant.name,
                    topic: mutant.topic,
                    phone: mutant.phone,
                    senderUid: auth.isLoggedIn().uid,
                }), 
                function(processedText){
                    console.log('text processed');
                    console.log(processedText);
                    
                    if(processedText.isSent === true){
                        console.log('success');
                        vm.error = null;
                        mutant.notified = true; 
                        scheduler.updateMutantInMutants(mutant, vm.mutants);
                    }else{
                        console.log('failed');
                        console.log(processedText);
                        vm.error = processedText.error;
                    }
                    hacks.safeDigest($scope);
                });
            }
        }
})();
