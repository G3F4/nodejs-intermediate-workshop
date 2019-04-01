const express = require('express');
const bodyParser = require('body-parser');
const mocksApi = require('./mocks/api.js');
const dbApi = require('./db/api.js');

const app = express();

app.use(bodyParser.json());

const api = process.env.MOCKS ? mocksApi : dbApi;

app.get('/calendar', function (req, res) {
  console.log(['get:calendar'], req.query);
  res.json({
    data: api.getMonth(req.query.month),
  });
});

app.get('/day', function (req, res) {
  console.log(['get:day'], req.query);
  res.json({
    data: api.getDayEvents(req.query.date),
  });
});

app.post('/event', function (req, res) {
  console.log(['post:event'], req.body);
  res.status(201);
  res.send();
});

app.put('/event', function (req, res) {
  console.log(['put:event'], req.query.id, req.body);
  res.status(200);
  res.send();
});

app.delete('/event', function (req, res) {
  console.log(['delete:event'], req.query.id);
  res.status(204);
  res.send();
});

app.set('port', 5000);

app.listen(app.get('port'), () => {
  console.info( `express app running on port: ${app.get('port')}`);
});
