const bot = require('./server');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ version: '1.0.0' });
});

const server = app.listen(PORT, "0.0.0.0", function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Web server started at http://%s:%s', host, port);
});

app.post('/' + bot.token, function (req, res) {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});
