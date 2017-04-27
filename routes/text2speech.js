/* This file holds the wishList
	It is volatile - when the server is closed, the list is deleted
*/
var express = require('express');
var router = express.Router();
var request = require('request');
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


router.get('/tonight', function(req, res, next)
{
  // Getting HTTP headers
  console.log("x-forwarded-for header: " + req.headers['x-forwarded-for']);
  console.log("x-cisco-device-state: " + req.headers['x-cisco-device-state']);
  console.log("x-cisco-vcs-identity: " + req.headers['x-cisco-vcs-identity']);

  console.log('text2speech tonight: ', req.originalUrl);

  request("http://localhost:8090/feature/ref/agg/grid?startDateTime=2017-04-27T20:00Z&eventsLimit=3", function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    //console.log('body:', body);

    var answer = JSON.parse(body);

    nameList = ["yesactionhd", "yesohhd", "Yes1"]
    nameList2pronunce = ["YES ACTION", "YES OH", "YES 1"]

    textToTell = ""
    for(var i = 0; i < answer.channels.length;i++){

        var name = answer.channels[i].name;
        console.log('channel:', name);
        if(isInArray(name, nameList)){
            var adaptedName = nameList2pronunce[nameList.indexOf(name)]
            var title = answer.channels[i].schedule[0].title;

            textToTell += "On " + adaptedName + ", " + title + ". .";
        }

        //var name = answer.channels[3].name;
        //var title = answer.channels[3].schedule[0].title;
        // var startTime = "8 pm";

        //var textToTell = "" + title + " at " + startTime + " on " + name;
        //var textToTell = "On " + name + ". At " + startTime + ". " + title + ".";
        //var textToTell1 = "On " + name + ", " + title + ". .";
        //var textToTell2 = "On " + "Yes" + ", " + "The United States of Leland" + ". .";
        //var textToTell3 = "On " + "Yes3" + ", " + "Pusher" + ". .";
        //textToTell = textToTell1 + textToTell2 + textToTell3
    }

    console.log('text2speech tonight:', textToTell);

    textToSpeech(textToTell, res);
  });
});


router.post('/', function (req, res) {
    var textToTell = req.body.textToTell;
    textToSpeech(textToTell, res);
});


function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

module.exports = router;
