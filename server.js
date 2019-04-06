const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const { PORT } = require('./constants');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(express.static('public'));
app.use(router);

app.set('port', PORT);

app.listen(app.get('port'), () => {
  console.info( `express app running on port: ${app.get('port')}`);
});
