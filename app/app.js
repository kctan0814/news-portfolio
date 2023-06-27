const express = require('express');
const { getTopics } = require('./controller/topics.controller');
const { handleCustomErrors, handleServerErrors } = require('./errors/errors');
const { getCommentsByArticleId } = require('./controller/articles.controller');

const app = express();

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;

