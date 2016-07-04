(function(){
    'use strict'

    angular
        .module('mutantApp.template')
        .directive('aaTemplate', aaTemplate);

    function aaTemplate(){
        return {
            templateUrl: 'app/template/template.directive.html',
            restrict: 'E',
            controller: TemplateDirectiveController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
            },
        };
    }

    TemplateDirectiveController.$inject = [];
    function TemplateDirectiveController(){
        var vm = this;

        ////////////

    }
})();
