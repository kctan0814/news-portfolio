const { selectCommentsByArticleId, selectArticleById, insertComment, selectArticles } = require("../model/articles.model")

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id).then(article => {
    res.status(200).send({article})
  }).catch(next)
}

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  insertComment(article_id, body)
  res.status(200).send()
}

exports.getArticles = (_, res, next) => {
  selectArticles().then((articles) => {
    res.status(200).send({articles})
  }).catch(next)
}
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id).then((comments) => {
    res.status(200).send({comments})
  }).catch(next)
}