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
            vm.success = null;
            vm.isLoggedIn = auth.isLoggedIn;
            vm.clearMessages = clearMessages;
            vm.onThClick = onThClick;
            vm.ths = [
                new Th({
                    innerText: 'Name',
                    orderByExp: 'name',
                }),
                new Th({
                    innerText: 'Phone',
                    orderByExp: 'phone',
                }),
                new Th({
                    innerText: 'Topic',
                    orderByExp: 'topic',
                }),
                new Th({
                    innerText: 'Notified',
                    orderByExp: 'notified',
                }),
                new Th({
                    innerText: 'Complete',
                    orderByExp: 'isComplete',
                }),
                new Th({
                    innerText: 'Actions',
                    orderByExp: '',
                    public: false,
                }),
            ]

            ////////////

            function Th (opts){
                this.modifier = (opts.modifier ? opts.modifier : null);
                this.active = (opts.active ? opts.acitve : false);
                this.innerText = (opts.innerText ? opts.innerText : 'Default');
                this.orderByExp = (opts.orderByExp ? opts.orderByExp : '');
                this.public = (opts.public === undefined ? opts.public : true);
            }

            vm.mutants.$watch(function(event){
                console.log(event);
                if(event.event === 'child_added'){
                    vm.clearMessages();
                }
            });

            function onThClick(index){
                vm.ths.forEach(function(th, i){
                    if(i === index){
                        th.active = true;
                        if(th.modifier !== '-'){
                            th.modifier = '-';
                        }else{
                            th.modifier = '+';
                        }
        
                        vm.orderByExp = th.modifier + th.orderByExp;
                    }else{
                        th.active = false;
                        th.modifier = null;
                    }
                });
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
