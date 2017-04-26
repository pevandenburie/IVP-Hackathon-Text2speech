var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var constants = require('../constants.js');



/* Expected URL fomrat (example)
	http://localhost:8090/actions?instanceId=auto%3ANice_Guys~Nice_GuysinstanceId~vod
*/
router.get('/', function(req, res, next) 
{
	// Getting HTTP headers
	console.log("x-forwarded-for header: " + req.headers['x-forwarded-for']);
	console.log("x-cisco-device-state: " + req.headers['x-cisco-device-state']);
	console.log("x-cisco-vcs-identity: " + req.headers['x-cisco-vcs-identity']);


	// Get categoryId
	console.log("instanceId: " + req.query.instanceId);

	var actions = setActions(req.query.instanceId);
	console.log(JSON.stringify(actions));
	res.send(actions);

});


function setActions(instanceId)
{
	var actions = [];

	actions.push({
		"name" : "Add to list",
		"type" : "url",
		"method" : "POST",
		"href" : constants.httpHost + ":" + constants.httpListeningPort + "/wishlist/" + instanceId
	});


    actions.push({
            "name" : "On the Web",
            "type" : "app",
            "platforms" : {
                    "ios" : {
                            "applicationId" : "http://www.imdb.com/title/tt2277860/"
                    },
                    "android" : {
                           "applicationId" : "http://www.imdb.com/title/tt2277860/"
                    }
            }
    });


    actions.push({
            "name" : "Watch in YouTube",
            "type" : "app",
            "platforms" : {
                    "ios" : {
                            "applicationId" : "https://www.youtube.com/watch?v=3JNLwlcPBPI"
                    },
                    "android" : {
                            "applicationId" : "https://www.youtube.com/watch?v=3JNLwlcPBPI"

                    }
            }
    });

	return actions;
}


module.exports = router;
module.exports.setActions = setActions;
