const express = require('express');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(
  'mongodb://localhost:27017/bitfilmsdb',
  { useNewUrlParser: true },
  () => console.log('База данных загружена'),
);

app.use(routes);
app.use(errorHandler);

app.listen(PORT);
