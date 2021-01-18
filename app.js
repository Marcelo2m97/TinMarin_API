const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const AuthMiddleware = require('./middlewares/Auth');

const apiRouter = require('./routes/api');
const apiPrivateRouter = require('./routes/api-private');

const { connect } = require('./config/database');

connect();

const app = express();

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
