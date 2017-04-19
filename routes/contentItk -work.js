var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var constants = require('../constants.js');



//getFromItk();

//var itkUrl = 'https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1/categories';
var authorizationToken = 'RMLoM3C64oM8K6Aw6l9G5Nq9Nvdi';



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
	console.log("in getFromItk")
	var headers = { 
    	'Authorization' : 'Bearer ' + constants.AuthToken
	};




	var RequestUrl =  'https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1/agg/content/?categoryId=' + categoryId;
	request({ url: RequestUrl, method: "GET", headers: headers }, 
		function (err, resp, data) 
		{
			console.log ("Request URL " +  RequestUrl);
			
			res.send(data);
		});
}


/*
		function (err, resp, data) 
		{
			console.log ("Request URL " +  RequestUrl);
			console.log("!!! err " + err);
//			console.log("@@@ resp.statusCode " + resp.statusCode);
			console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
			console.log(JSON.stringify(resp));
			console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
			console.log("### data " + data);
			res.send(data);
		});
*/


module.exports = router;
