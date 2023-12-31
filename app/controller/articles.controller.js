const { selectCommentsByArticleId, selectArticleById, insertComment, selectArticles, updateArticle, removeComment } = require("../model/articles.model")

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id).then(article => {
    res.status(200).send({article})
  }).catch(next)
}

exports.getArticles = (req, res, next) => {
  const { topic, sort_by, order } = req.query;
  selectArticles(topic, sort_by, order).then((articles) => {
    res.status(200).send({articles})
  }).catch(next)
}
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id).then((comments) => {
    res.status(200).send({comments})
  }).catch(next)
}

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id).then(() => {
    res.status(204).send();
  }).catch(next)
}

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  updateArticle(article_id, body).then((article) => {
    res.status(200).send({article})
  }).catch(next)
}

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  insertComment(article_id, body).then((comment) => {
    res.status(200).send({comment})
  }).catch((err) => {
    next(err)
  })
}