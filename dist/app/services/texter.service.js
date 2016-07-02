(function(){
    angular.module('mutantApp.services.core')
        .factory('texter',  texterFactory);

    texterFactory.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseData'];
    function texterFactory($firebaseArray, $firebaseObject, firebaseData){
        var pendingTexts = $firebaseArray(firebaseData.pendingTexts);

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
                this.senderUid = obj.senderUid;
            }else{
                this.phone = null;
                this.topic = null;
                this.name = null;
                this.senderUid = null;
            }   
        }

        //////////////////

        function send(text, callback){
            pendingTexts.$add(text)
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

