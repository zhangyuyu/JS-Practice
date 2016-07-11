var express = require('express');
var bodyParser = require('body-parser');
var printInventory = require('./src/main.js')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/receipt', function (req, res) {
    inputs = req.body.items.split(",")
    res.send(printInventory(inputs));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});