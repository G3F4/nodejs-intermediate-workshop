const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mocksApi = require('./mocks/api.js');
const dbApi = require('./db/api.js');

const PORT = process.env.PORT || 5000;

const api = process.env.MOCKS ? mocksApi : dbApi;
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('combined'));

app.get('/calendar', function (req, res) {
  res.json({
    data: api.getMonth(req.query.month),
  });
});

app.get('/day', function (req, res) {
  res.json({
    data: api.getDayEvents(req.query.date),
  });
});

app.post('/event', function (req, res) {
  res.status(201);
  res.send();
});

app.put('/event', function (req, res) {
  res.status(200);
  res.send();
});

app.delete('/event', function (req, res) {
  res.status(204);
  res.send();
});

app.post('/notifications', function (req, res) {
  res.status(201);
  res.send();
});

app.set('port', PORT);

app.listen(app.get('port'), () => {
  console.info( `express app running on port: ${app.get('port')}`);
});
