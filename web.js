var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());

var fileBuf = fs.readFileSync('index.html');
var fileContent = fileBuf.toString();

app.get('/', function(request, response) {
//  response.send('Hello World 2!');
    response.send(fileContent);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});