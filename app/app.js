const express = require('express');
const { getTopics } = require('./controller/topics.controller');
const { handlePsqlErrors, handleCustomErrors, handleServerErrors } = require('./errors/errors');

const app = express();

app.get('/api/topics', getTopics)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

module.exports = app;

