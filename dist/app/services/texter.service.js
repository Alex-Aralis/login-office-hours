(function(){
    angular.module('mutantApp.services.core')
        .factory('texter',  texterFactory);

    texterFactory.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseData'];
    function texterFactory($firebaseArray, $firebaseObject, firebaseData){
        var texter =  {
            Text: Text,
            send: send,
            reset: reset,
            pendingTexts: null,
        };

        return texter;

        function Text(obj){
            if (obj){
                this.phone = obj.phone;
                this.topic = obj.topic;
                this.name = obj.name;
                this.senderUid = obj.senderUid;
            }else{
                this.phone = null;
                this.topic = null;
                this.name = null;
                this.senderUid = null;
            }   
        }

        //////////////////

        function reset(){
            if(texter.pendingTexts && texter.pendingTexts.$destroy){
                texter.pendingTexts.$destroy();
            }           
            texter.pendingTexts = null;
        }

        function getPendingTexts(){
            return texter.pendingTexts || 
                ( texter.pendingTexts = $firebaseArray(firebaseData.pendingTexts) );
        }

        function send(text, callback){
            getPendingTexts().$add(text)
                .then(function(ret){
                    console.log(ret.getKey());
                    return firebaseData.processedTexts
                        .orderByKey()
                        .equalTo(ret.getKey())
                        .once('child_added')
                        .then(function(processedTextRef){
                            callback(processedTextRef.val())
                            processedText.$destroy();
                        });
                });
        } 
    }
})();

