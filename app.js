const express = require('express');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { MONGO_URL } = require('./config');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rate-limiter');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true },
  () => console.log('База данных загружена'),
);

app.use(cors);
app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
