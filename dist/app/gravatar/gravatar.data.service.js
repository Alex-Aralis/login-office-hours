(function(){
    'use strict';

    angular.module("ui.gravatar")
        .factory('gravatarData', GravatarFactory);

    GravatarFactory.$inject = ['$q', '$http', 'md5'];
    function GravatarFactory($q, $http, md5){
        'use strict'

        var gravatarData = {
            getUrl: getUrl,
            json: json,
        }

        return gravatarData;

        /////////////////////////////////

        function getUrl(email, options) {
            //check to make sure you gave us something
            var options = options || {},
                    base,
                    params = [];

            //set some defaults, just in case
            options = {
                    size: options.size || "50",
                    rating: options.rating || "g",
                    secure: options.secure || (location.protocol === 'https:'),
                    backup: options.backup || ""
            };

            //setup the email address
            email = email.trim().toLowerCase();

            //determine which base to use
            base = options.secure ? 'https://secure.gravatar.com/avatar/' : 'http://www.gravatar.com/avatar/';
            
            //add the params
            if (options.rating) {params.push("r=" + options.rating)};
            if (options.backup) {params.push("d=" + encodeURIComponent(options.backup))};
            if (options.size) {params.push("s=" + options.size)};
           
            //now throw it all together
            return base + md5(email) + "?" + params.join("&");
        }

        function json(email){
            return $q(function(resolve, reject){
                if(typeof(email) !== 'string' && email !== ''){
                    reject('email must be a non-empty string');
                }

                $http.get(
                    'http://cors.io/?u=https://www.gravatar.com/'+md5(email.trim().toLowerCase())+'.json'
                )
                .then(resolve)
                .catch(function(err){
                    console.log(err);
                    console.log('User has no account on Gravatar.');
                    resolve(err);
                });
            });
        }
    }
})()
