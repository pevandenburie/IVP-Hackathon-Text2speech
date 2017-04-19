var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var constants = require('./constants.js');

var index = require('./routes/index');


var content = require('./routes/content'); // Uses with dummy file
// var content = require('./routes/contentItk'); // Uses ITK
var contentInstances = require('./routes/contentInstances'); // Uses dummy file
// var contentInstances = require('./routes/contentInstancesItk'); // Uses ITK



var app = express();

console.log("start server - listening on port " + constants.httpListeningPort);

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



//Mapping of calls
app.use('/', index);
app.use('/ctap/r1.3.0/agg/content', content);
app.use('/ctap/r1.3.0/contentInstances', contentInstances);

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
  res.render('error');
});

//module.exports = app;


app.listen(constants.httpListeningPort);
