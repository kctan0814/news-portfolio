const express = require('express');
const { getTopics } = require('./controller/topics.controller');
const { handleCustomErrors, handleServerErrors } = require('./errors/errors');
const { getArticles } = require('./controller/articles.controller');

const app = express();

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;

