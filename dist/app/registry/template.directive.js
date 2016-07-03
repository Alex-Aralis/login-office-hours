(function(){
    'use strict'

    angular
        .module('mutantApp.template')
        .directive('aaTemplateForm', aaTemplateForm);

    function aaTemplateForm(){
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
