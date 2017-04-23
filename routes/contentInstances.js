var express = require('express');
var router = express.Router();
var fs = require('fs');



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

	fs.readFile("./data/"+req.params.instanceId+".json", "utf8", function(err, content){
		if(err) {
			// could not find the content
			res.status(404);
		} else {
			res.send(content, null, 3);
		}
	});
});


module.exports = router;
