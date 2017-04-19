var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var constants = require('../constants.js');




/* Expected URL fomrat (example)
	http://localhost:8090//ctap/r1.3.0/contentInstances/DSNY2395427000000171~DSNY2395427000000173
*/
router.get('/:instanceId*', function(req, res, next) 
{

	// Getting HTTP headers
	console.log("x-forwarded-for header: " + req.headers['x-forwarded-for']);
	console.log("x-cisco-device-state: " + req.headers['x-cisco-device-state']);
	console.log("x-cisco-vcs-identity: " + req.headers['x-cisco-vcs-identity']);

	// Get instanceId value
	console.log("instanceId: " + req.params.instanceId);

	getFromItk(instanceId, res);

/*
	// Input of response is a json file
	fs.readFile("./data/contentInstances.json", "utf8", function(err, content) 
	{
		if (err) 
		{
			return console.log(err);
		}
  		res.send(content, null, 3);
//		console.log(content);
	});
*/
});


function getFromItk(instanceId, res)
{
	console.log("in getFromItk")
	var headers = { 
    	'Authorization' : 'Bearer ' + constants.AuthToken
	};


	var RequestUrl =  'https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1/contentInstances/' + instanceId;
	request({ url: RequestUrl, method: "GET", headers: headers }, 
		function (err, resp, data) 
		{
			console.log ("Request URL " +  RequestUrl);
			
			res.send(data);
		});
}







module.exports = router;
