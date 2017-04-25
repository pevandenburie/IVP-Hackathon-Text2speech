var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var constants = require('./constants.js');


/*
 NodeJS Express - "routes"
 Files that know how to implement an HTTP endpoint
 */
var index   = require('./routes/index');
var feature = require('./routes/feature');

//Use Dummy files
var content = require('./routes/content'); // Uses with dummy file
var contentInstances = require('./routes/contentInstances'); // Uses dummy file

//Use ITK
//var content = require('./routes/contentItk'); // Uses ITK
//var contentInstances = require('./routes/contentInstancesItk'); // Uses ITK

var actions = require('./routes/actions');
var wishList = require('./routes/wishList');


/*
 Start up the web app with some standard settings
 */
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// global controller
app.get('/*',function(req,res,next){
  res.setHeader('Content-Type', 'application/json');
  next(); // http://expressjs.com/guide.html#passing-route control
});



/*
 Mapping of URLs to "routes"
 If you add a route above then set the base URL here
 */
app.use('/', index);
app.use('/feature', feature);
app.use('/ctap/r1.3.0/agg/content', content);
app.use('/ctap/r1.3.0/contentInstances', contentInstances);
app.use('/actions', actions);
app.use('/wishList', wishList);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});


// Actually start the server and start listening

console.log("start server - listening on port " + constants.httpListeningPort);

app.listen(constants.httpListeningPort);
