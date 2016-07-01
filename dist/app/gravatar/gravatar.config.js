(function(){
    'use strict'

    angular.module('ui.gravatar')
        .config(gravatarConfigFunction);

    gravatarConfigFunction.$injector = ['gravatarServiceProvider'];
    function gravatarConfigFunction(gravatarServiceProvider){
        gravatarServiceProvider.defaults = {
            "default": 'identicon',
        };
    }
})();
