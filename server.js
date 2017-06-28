// server.js
// where your node app starts

// init project
var express = require('express');
var os = require('os');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
 
});
app.get("/api",function(request,response){
  var ip=request.headers['x-forwarded-for'];
  var clientIp= ip.substr(0, ip.indexOf(',')); 
  
  var language =request.headers["accept-language"];
  var userLanguage = language.substr(0,language.indexOf(','));
  
  var osInfo = os.type();
  //var cpus = os.cpus();
  //var freeMem = os.freemem()/1024/1024
  
  var result = {IP:clientIp,Language:userLanguage,software:osInfo};
  response.end(JSON.stringify(result));
});






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
