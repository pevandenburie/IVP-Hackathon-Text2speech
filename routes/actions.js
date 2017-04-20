/* This module gets content via ITK */

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

	var actions = {}; // empty Object
	var key = 'extraActions';
	actions[key] = []; // empty Array, which you can push() values into


	var action1 = {
        "name" : "Add to list",
        "type" : "url",
        "method" : "POST", 
        "href" : "http://localhost:" + constants.httpListeningPort + "/wishList/" + instanceId
		};

	var action2 = {
	    'name' : 'Like',
	    'type' : 'app',
	    'platforms' : {
			'ios' : {
					'applicationId' : 'like-launch',
					'parameters' : {
						'instanceId' : instanceId
					}
					
				},
			'android' : {
					'applicationId' : 'like.package',
					'parameters' : {
						'instanceId' : instanceId
					}
					
				},
			'pcmac' : {
					'applicationId' : 'pcmac-like',
					'parameters' : {
						'instanceId' : instanceId
					}
					
				}
			}
		};


	actions[key].push(action1);
	actions[key].push(action2);

	return actions;
}





module.exports = router;
module.exports.setActions = setActions;
