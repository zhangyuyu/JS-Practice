var express = require('express');
var app = express();
var printInventory = require('./src/main.js')

app.get('/', function (req, res) {
  const inputs = "ITEM000001,ITEM000001,ITEM000001,ITEM000001,ITEM000001,ITEM000003-2,ITEM000005,ITEM000005,ITEM000005".split(",");
  res.send(printInventory(inputs));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});