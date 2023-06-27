const express = require('express');
const { getTopics } = require('./controller/topics.controller');
const { handleCustomErrors, handleServerErrors, handlePsqlErrors } = require('./errors/errors');
const { getArticleById } = require('./controller/articles.controller');

const app = express();

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticleById)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

module.exports = app;

