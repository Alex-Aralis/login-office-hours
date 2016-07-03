(function(){
    angular.module('mutantApp.services.core')
        .factory('th', thFactory);

    thFactory.$inject = [];
    function thFactory(){
        var service =  {
            Th: Th,
            getOrderByExp: getOrderByExp,
        }

        return service;

        //////////////////
        
        function Th (opts){
            this.modifier = (opts.modifier ? opts.modifier : null);
            this.active = (opts.active ? opts.acitve : false);
            this.innerText = (opts.innerText ? opts.innerText : 'Default');
            this.orderByExp = (opts.orderByExp ? opts.orderByExp : '');
            this.public = (opts.public === undefined ? opts.public : true);
        }
        
        //////////////////
        
        function getOrderByExp(index, ths){
            var orderByExp = '-';

            ths.forEach(function(th, i){
                if(i === index){
                    th.active = true;
                    if(th.modifier !== '-'){
                        th.modifier = '-';
                    }else{
                        th.modifier = '+';
                    }
    
                    var orderByExp = th.modifier + th.orderByExp;
                }else{
                    th.active = false;
                    th.modifier = null;
                }
            });

            return orderByExp;
        }

    }
})();
