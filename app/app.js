const express = require('express');
const cors = require('cors')
const { handlePsqlErrors, handleCustomErrors, handleServerErrors } = require('./errors/errors');
const { getTopics } = require('./controller/topics.controller');
const { getEndpoints } = require('./controller/api.controller');
const { getArticleById, getCommentsByArticleId, getArticles, patchArticle } = require('./controller/articles.controller');
const { getArticleById, postComment, getCommentsByArticleId, getArticles } = require('./controller/articles.controller');

const app = express();

app.use(express.json())
app.use(cors())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.patch('/api/articles/:article_id', patchArticle)

app.post('/api/articles/:article_id/comments', postComment)

app.use(handlePsqlErrors)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;

