const { selectArticles } = require("../model/articles.model")

exports.getCommentsByArticleId = (_, res, next) => {
  selectArticles().then((comments) => {
    res.status(200).send({comments})
  }).catch(next)
}