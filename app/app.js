const express = require('express');
const { handlePsqlErrors, handleCustomErrors, handleServerErrors } = require('./errors/errors');
const { getTopics } = require('./controller/topics.controller');
const { getEndpoints } = require('./controller/api.controller');
const { getArticleById, postComment } = require('./controller/articles.controller');

const app = express();

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.post('/api/articles/:article_id/comments', postComment)

app.use(handlePsqlErrors)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;

