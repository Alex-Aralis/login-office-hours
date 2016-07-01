(function(){
    angular.module('mutantApp.services.core')
        .factory('hacks', hacksServiceFactory);

    hacksServiceFactory.$inject = ['$rootScope'];
    function hacksServiceFactory($rootScope){
        var hacks =  {
            safeDigest: safeDigest,
        }

        return hacks;

        //////////////////

        function safeDigest(scope){
            if(typeof(scope) === 'undefined'){
                scope = $rootScope;
            }

            try{
                scope.$digest();
            }catch(err){
                console.log(err);
            }
        }
    }
})();
