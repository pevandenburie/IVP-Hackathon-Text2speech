
/*

This file lets you add endpoints under /feature/ which will by proxied by ctap to this service
Use this if you want your apps to talk to your cloud service directly

For example - suppose you want to add the ability to your cloud service to say hello,
and you have an app that can use that to say hi to your users

Get the app to call ctap:
http://ctap.ztv.cisco.com:8000/ctap/r1.3.0/feature/hello

CTAP will then call this service and return whatever you supply - in this case a hello message

Your app can then use that as it likes.

Feel free to add more methods here as needed

 */

var express = require('express');
var router = express.Router();
var refAPI = require("../lib/refAPI");

/* Expected URL
 http://localhost:8090/feature/*
 */
router.get('/hello', function(req, res, next)
{
    // Getting HTTP headers
    console.log("x-forwarded-for header: " + req.headers['x-forwarded-for']);
    console.log("x-cisco-device-state: " + req.headers['x-cisco-device-state']);
    console.log("x-cisco-vcs-identity: " + req.headers['x-cisco-vcs-identity']);

    res.send(
        {
          "hello" : "world"
        }
    );
});

router.get("/ref/*", function(req, res, next){

    var urlToCall = req.url;
    // strip off the '/ref' prefix
    var pos = "/ref".length;
    urlToCall = urlToCall.substr(pos, urlToCall.length - pos);


    console.log("ref API test: " + urlToCall);

    refAPI.call("GET", urlToCall, {}, function(err, data){
        console.log(JSON.stringify(err));
        console.log(JSON.stringify(data));

        if(err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});


module.exports = router;
