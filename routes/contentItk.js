/* This module gets content via ITK */

var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var constants = require('../constants.js');



/* Expected URL fomrat (example)
	http://localhost:8090/ctap/r1.3.0/agg/content/?categoryId=crid://schange.com/7a6c12d2-32f7-4f6f-8beb-66ddd2c84aeb~TERM:crid://schange.com/7a6c12d2-32f7-4f6f-8beb-66ddd2c84aeb&sort=-date&limit=50&isAdult=false&isErotic=true&source=vod
*/
router.get('/', function(req, res, next) 
{
	// Getting HTTP headers
	console.log("x-forwarded-for header: " + req.headers['x-forwarded-for']);
	console.log("x-cisco-device-state: " + req.headers['x-cisco-device-state']);
	console.log("x-cisco-vcs-identity: " + req.headers['x-cisco-vcs-identity']);


	// Get categoryId
	console.log("categoryId: " + req.query.categoryId);

	getFromItk(req.query.categoryId, res);

});



function getFromItk(categoryId, res)
{
	// Set ITK Authorization header
	var headers = { 
    	'Authorization' : 'Bearer ' + constants.AuthToken
	};

	// Build URL including category ID.
	var RequestUrl =  constants.ITKHostPrefix + '/agg/content/?categoryId=' + categoryId;
	
	request({ url: RequestUrl, method: "GET", headers: headers }, 
		function (err, resp, data) 
		{
			console.log ("Request URL " +  RequestUrl);

			if (err)
			{
				console.log(err);
				res.send(err);
			}
			else
			{
				res.send(data);
			}
		});
}


module.exports = router;
