/* This module gets content from dummy file*/


var express = require('express');
var router = express.Router();
var fs = require('fs');


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

	// Input of response is a json file
	fs.readFile("./data/labsContent.json", "utf8", function(err, content)
	{
		if (err) 
		{
			return console.log(err);
		}
  		res.send(content, null, 3);
	});
});



module.exports = router;
