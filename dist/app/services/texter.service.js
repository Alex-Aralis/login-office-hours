(function(){
    angular.module('mutantApp.services.core')
        .factory('texter',  texterFactory);

    texterFactory.$inject = ['$firebaseArray', 'firebaseData'];
    function texterFactory($firebaseArray, firebaseData){
        var texter =  {
            Text: Text,
            send: send,
        };

        return texter;

        function Text(obj){
            if (obj){
                this.phone = obj.phone;
                this.topic = obj.topic;
                this.name = obj.name;
            }

            this.phone = null;
            this.topic = null;
            this.name = null;
        }

        //////////////////

        function send(text){
            return firebaseData.texts.push(text);
        } 
    }
})();

