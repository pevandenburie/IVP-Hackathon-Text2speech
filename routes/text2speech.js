/* This file holds the wishList
	It is volatile - when the server is closed, the list is deleted
*/
var express = require('express');
var router = express.Router();
var tts = require('../lib/voice-rss-tts');

textToSpeech = function(textToTell, res) {
    tts.speech({
        key: '3206e313532241978925f854f7ccb019',
        hl: 'en-us',
        src: textToTell,
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
        b64: false,
        callback: function (error, content) {
            res.end(error || content);
        }
    });
};


/* Get text2speech - Gets content info from ITK */
/* Expected URL fomrat (example)	GET: http://localhost:8090/wishList*/
router.get('/', function(req, res, next)
{
	// Getting HTTP headers
	console.log("x-forwarded-for header: " + req.headers['x-forwarded-for']);
	console.log("x-cisco-device-state: " + req.headers['x-cisco-device-state']);
	console.log("x-cisco-vcs-identity: " + req.headers['x-cisco-vcs-identity']);

  console.log('text2speech: ', req.originalUrl);
  var textToTell = req.query.textToTell;
  textToSpeech(textToTell, res);
});


router.post('/', function (req, res) {
    var textToTell = req.body.textToTell;
    textToSpeech(textToTell, res);
});

module.exports = router;
