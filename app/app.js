const express = require('express');
const { getTopics } = require('./controller/topics.controller');
const { handlePsqlErrors, handleCustomErrors, handleServerErrors } = require('./errors/errors');
const { getEndpoints } = require('./controller/api.controller');

const app = express();

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', )

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;

