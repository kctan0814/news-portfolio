const express = require('express');
const { handlePsqlErrors, handleCustomErrors, handleServerErrors } = require('./errors/errors');
const { getTopics } = require('./controller/topics.controller');
const { getEndpoints } = require('./controller/api.controller');
const { getArticleById, getArticles } = require('./controller/articles.controllet');

const app = express();

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getArticles)

app.use(handleCustomErrors)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;

