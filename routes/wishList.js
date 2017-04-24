/* This file holds the wishList 
	It is volatile - when the server is closed, the list is deleted
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var constants = require('../constants.js');
var async = require('async'); 


var wishList = [];

/* Add instance to wishList, if already found, do nothing */
/* Expected URL fomrat (example)
	POST: http://localhost:8090/wishList/auto:Nice_Guys~Nice_GuysinstanceId~vod
*/
router.post('/:instanceId*', function(req, res, next) 
{
	var instanceId;
	var found = false;
	var outputMessage = "instanceId already found: ";

	// Getting HTTP headers
	console.log("x-forwarded-for header: " + req.headers['x-forwarded-for']);
	console.log("x-cisco-device-state: " + req.headers['x-cisco-device-state']);
	console.log("x-cisco-vcs-identity: " + req.headers['x-cisco-vcs-identity']);

	// Get instanceId value
	console.log("Add instanceId: " + req.params.instanceId);

	// Check if already in array
	wishList.forEach(function(value, index){
  	if (value.id == req.params.instanceId)
	  	{
	  		found = true;
			console.log("Instance already exists");
	  	}
	});
	if (found == false)
	{
		instanceId =  {"id" : req.params.instanceId};
		wishList.push(instanceId);
		outputMessage = "added instanceId: ";
	}

	res.send(JSON.stringify({ name: outputMessage + req.params.instanceId}, null, 3));
});

/* Delete instance from wishList, if not found, do nothing */
/* Expected URL fomrat (example)
	DELETE: http://localhost:8090/wishList/auto:Nice_Guys~Nice_GuysinstanceId~vod
*/
router.delete('/:instanceId*', function(req, res, next) 
{
	var outputMessage = "instanceId not found: ";

	// Getting HTTP headers
	console.log("x-forwarded-for header: " + req.headers['x-forwarded-for']);
	console.log("x-cisco-device-state: " + req.headers['x-cisco-device-state']);
	console.log("x-cisco-vcs-identity: " + req.headers['x-cisco-vcs-identity']);


	// Get instanceId value
	console.log("Delete instanceId: " + req.params.instanceId);

	wishList.forEach(function(value, index){
	  if (value.id == req.params.instanceId)
	  	{
			var deletedInstance = wishList.splice(index, 1);
			outputMessage = "Deleted instanceId: ";
			console.log("Deleted item ");
			console.log(deletedInstance);
	  	}
	});

	res.send(JSON.stringify({ name: outputMessage + req.params.instanceId }, null, 3));
});


/* Get wishList - Gets content info from ITK */
/* Expected URL fomrat (example)	GET: http://localhost:8090/wishList*/
router.get('/', function(req, res, next)
{

	// Getting HTTP headers
	console.log("x-forwarded-for header: " + req.headers['x-forwarded-for']);
	console.log("x-cisco-device-state: " + req.headers['x-cisco-device-state']);
	console.log("x-cisco-vcs-identity: " + req.headers['x-cisco-vcs-identity']);

	// Response format
	var responseContent = {"count":0,"total":0,"content":[],"locators":{"start":"{0,java.lang.Long,INVERTED}-|-{NzJmY2Q1ODg3NGZlM2YwYWVjMTk=,java.lang.String,NORMAL}[+]{dateTimeAdded,INVERTED}-|-{hashKey,NORMAL}","end":"{0,java.lang.Long,INVERTED}-|-{YzA4NTlkMDYyYzI0MjZmNWZlYjA=,java.lang.String,NORMAL}[+]{dateTimeAdded,INVERTED}-|-{hashKey,NORMAL}"},"_links":{"self":{"href":"/agg/content?categoryId=urn%3Aspvss%3Aih%3Azorro%3Aterm%3A7000%3AACTION&needVodPurchaseProperty=true&offset=undefined&limit=10&classificationId=urn%3Aspvss%3Aih%3Azorro%3Aterm%3A7000%3AACTION&phrase=undefined&serviceLocator=undefined&sort=undefined&seriesId=undefined&seasonId=undefined"}}}
	var contentArray = [];

	async.forEach(wishList, function(instance, cb){
		getContentInstanceFromItk(instance.id, function(err, contentData){
			if (err){
				console.log("err");
				cb(err);
			}
			// If content is found, add it and increment counters
			if (contentData)
			{
 				responseContent.count++;
				responseContent.total++;
				contentArray.push(contentData);
 			}			
			cb();
		});
	}, function(err){
		if (err){
			//deal with the error
		}
		
		// Set content in content array in the response
 		responseContent.content = contentArray;
		res.send(responseContent, null, 3);

	});
});




function getContentInstanceFromItk(instanceId, cb )
{
	// Set ITK Authorization header
	var headers = { 
    	'Authorization' : 'Bearer ' + constants.AuthToken
	};

 	
	// Build URL including instanceId.
	var RequestUrl =  constants.ITKHostPrefix + '/contentInstances/' + instanceId; 
	request({ url: RequestUrl, method: "GET", headers: headers }, 
		function (err, resp, data) 
		{
			console.log ("Request URL " +  RequestUrl);
			
			if (err)
			{
				console.log(err);
				cb(0, null); 
			}
			else
			{
				/* If access denied due to token expiration don't add content
					Need better error handling */
				if(data.includes("Access Denied" )) 
				{
					console.log("Access Denied");
					cb(0, null);
				}
				else
					cb(0,JSON.parse(data))
			}
		});
}


/* Get wishList - Basic */
/* Expected URL fomrat (example)	GET: http://localhost:8090/wishList*/
/*
router.get('/', function(req, res, next)
{
	console.log(wishList);
	res.send(wishList, null, 3);
});
*/


module.exports = router;
