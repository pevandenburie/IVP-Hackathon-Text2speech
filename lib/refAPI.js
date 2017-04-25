
/*
  Utility functions to call Ref API - either locally or through the infinite toolkit
 */

var config  = require('../constants.js');
var request = require('request');

/*
 Call the Ref API - either through ITK or local CTAP

 url should be a relative URL to the Ref API, for eample /agg/content
 params should be an object, for example { cateogryId: 'abc' }
 callback is a function (error, data)

 */
function call(method, url, params, callback) {
    console.log("refAPI.call() " + config.UseITK);

    var options = {
        method: method,
        params: params
    }
    
    if(config.UseITK)  {

        options.url = config.ITKHostPrefix + url;
        options.headers = {
            'Authorization' : 'Bearer ' + config.AuthToken
        };
    } else {
        // Call CTAP directly and stringify the identity header
        options.url     = config.LocalCtap.host + url;
        options.headers = {
            "x-cisco-vcs-identity" : JSON.stringify(config.LocalCtap.headers["x-cisco-vcs-identity"])
        };
        
    }

    console.log("Calling RefAPI: " + options.method + " " + options.url);
    console.log("headers: " + JSON.stringify(options.headers));

    request(options,
        function (err, resp, data) {
            if (err) {
                if(config.UseITK) {
                    // we may get errors from ITK because our token has expired
                    // in which case we should try to refresh the token and try again

                } else {
                    // Oh dear, something went wrong, pass it along
                    console.log(err);
                    callback(err);
                }
            } else {
                // pass back data
                callback(null, data)
            }
        });

}

module.exports = {
   call: call
};