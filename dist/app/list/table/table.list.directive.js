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

        ListTableDirectiveController.$inject = ['$scope', 
            '$rootScope', 
            'auth', 
            'texter', 
            'scheduler', 
            'hacks', 
            'th'
        ];
        function ListTableDirectiveController($scope, $rootScope, auth, texter, scheduler, hacks, th){
            var vm = this;

            vm.deleteMutant = deleteMutant;
            vm.toggleComplete = toggleComplete;
            vm.sendTextTo = sendTextTo;
            vm.error = null;
            vm.success = null;
            vm.isLoggedIn = auth.isLoggedIn;
            vm.clearMessages = clearMessages;
            vm.onThClick = onThClick;
            vm.ths = [
                new th.Th({
                    innerText: 'Name',
                    orderByExp: 'name',
                }),
                new th.Th({
                    innerText: 'Phone',
                    orderByExp: 'phone',
                }),
                new th.Th({
                    innerText: 'Topic',
                    orderByExp: 'topic',
                }),
                new th.Th({
                    innerText: 'Notified',
                    orderByExp: 'notified',
                }),
                new th.Th({
                    innerText: 'Complete',
                    orderByExp: 'isComplete',
                }),
                new th.Th({
                    innerText: 'Actions',
                    orderByExp: '',
                    public: false,
                }),
            ]

            ////////////

            vm.mutants.$watch(function(event){
                if(event.event === 'child_added'){
                    vm.clearMessages();
                }
            });

            function onThClick(index){
                vm.orderByExp = th.getOrderByExp(index, vm.ths);
            }

            function deleteMutant(mutant){
                scheduler.deleteMutantFromMutants(mutant, vm.mutants);
            }

            function toggleComplete(mutant){
                mutant.isComplete = !mutant.isComplete;
                scheduler.updateMutantInMutants(mutant, vm.mutants);
            }

            function clearMessages(){

                vm.success = null;
                vm.error = null;

                hacks.safeDigest($scope);
            };

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
                    
                    clearMessages();
                    if(processedText.isSent === true){
                        console.log('success');
                        vm.success = {message: mutant.name + ' has been notified.'};
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
