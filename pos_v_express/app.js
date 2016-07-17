const express = require('express');
const bodyParser = require('body-parser');
const printInventory = require('./src/main.js')

const app = express();
app.use(bodyParser.json());

app.post('/receipt', function (req, res) {
    const inputs = req.body.items;
    const accept = req.headers.accept;
    res.send(printInventory(inputs, accept));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});