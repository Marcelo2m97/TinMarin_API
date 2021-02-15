const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const AuthMiddleware = require('./middlewares/Auth');

const apiRouter = require('./routes/api');
const apiPrivateRouter = require('./routes/api-private');

const { connect } = require('./config/database');

connect();

const app = express();

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use(AuthMiddleware.verifyAuth);
app.use('/api', apiPrivateRouter);

module.exports = app;
