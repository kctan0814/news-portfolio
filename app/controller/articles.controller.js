const { selectArticles, selectCommentsByArticleId } = require("../model/articles.model")

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  selectCommentsByArticleId(article_id, body).then((comment) => {
    res.status(200).send({comment})
  }).catch(next)
}