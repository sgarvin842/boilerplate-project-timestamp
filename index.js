// index.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment-timezone');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let date = new moment();
  const UNIX_MULTIPLIER = 1000;

  if(moment(req.params.date).isValid()){
    date = moment(req.params.date);
  }
  else if(moment.unix(req.params.date).isValid()){
    date = moment.unix(parseInt(req.params.date) / UNIX_MULTIPLIER);
  }
  else{
    res.json({error: "Invalid Date"})
  }
  res.json({unix: date.unix()*UNIX_MULTIPLIER, utc: date.tz('GMT').format('ddd, D MMM YYYY HH:mm:ss z')}); 
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
