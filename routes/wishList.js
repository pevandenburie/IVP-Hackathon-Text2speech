/* This file holds the wishList 
	It is volatile - when the server is closed, the list is deleted
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var constants = require('../constants.js');


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


/* Get wishList */
/* Expected URL fomrat (example)
	GET: http://localhost:8090/wishList
*/
router.get('/', function(req, res, next)
{
	console.log(wishList);
	res.send(wishList, null, 3);
});



module.exports = router;
