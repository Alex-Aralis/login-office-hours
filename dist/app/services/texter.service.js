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
            }else{
                this.phone = null;
                this.topic = null;
                this.name = null;
            }   
        }

        //////////////////

        function send(text, callback){
            firebaseData.pendingTexts.push(text)
                .then(function(ret){
                    console.log(ret.getKey());
                        
                    return firebaseData.processedTexts
                        .orderByKey()
                        .equalTo(ret.getKey())
                        .once('child_added')
                        .then(callback);
                });
        } 
    }
})();

