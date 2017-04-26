/* This file holds the wishList
	It is volatile - when the server is closed, the list is deleted
*/
var express = require('express');
var router = express.Router();


/* Get voiceSynth - Gets content info from ITK */
/* Expected URL fomrat (example)	GET: http://localhost:8090/wishList*/
router.get('/', function(req, res, next)
{

	// Getting HTTP headers
	console.log("x-forwarded-for header: " + req.headers['x-forwarded-for']);
	console.log("x-cisco-device-state: " + req.headers['x-cisco-device-state']);
	console.log("x-cisco-vcs-identity: " + req.headers['x-cisco-vcs-identity']);

  console.log(req);

	// Response format
	var responseContent = {"file": "http://www.voicerss.org/dummy.mp3"};

  res.send(responseContent);

	// async.forEach(wishList, function(instance, cb){
	// 	getContentInstanceFromItk(instance.id, function(err, contentData){
	// 		if (err){
	// 			console.log("err");
	// 			cb(err);
	// 		}
	// 		// If content is found, add it and increment counters
	// 		if (contentData)
	// 		{
 // 				responseContent.count++;
	// 			responseContent.total++;
	// 			contentArray.push(contentData);
 // 			}
	// 		cb();
	// 	});
	// }, function(err){
	// 	if (err){
	// 		//deal with the error
	// 	}
  //
	// 	// Set content in content array in the response
 // 		responseContent.content = contentArray;
	// 	res.send(responseContent, null, 3);
  //
	// });
});

module.exports = router;
