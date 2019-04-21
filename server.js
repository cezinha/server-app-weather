var express = require('express');
var request = require('request');
const PORT = process.env.PORT || 5000;
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/data', express.static(__dirname + '/data'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

let API_URL = "https://api.darksky.net/forecast/7c6a831ac85ee3b8e1922c91418f829f/"
//let API_URL = "www.google.com" 

app.get('/api', function(req, res) {
  var parts = req.url.split('?');
  var search = parts[1];  
  var query = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });

  console.log('calling API: ' + API_URL + query.location);

  request(API_URL + query.location, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    if (response && response.statusCode == 200) { 
      res.send(body); // Print the HTML for the Google homepage.
    } else {
      res.send(error);
    }
  });
});

app.listen(PORT, function () {
  console.log(`Listening on ${ PORT }`);
});