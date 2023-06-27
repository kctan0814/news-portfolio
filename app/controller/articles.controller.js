const { selectArticles } = require("../model/articles.model")

exports.getArticles = (_, res, next) => {
  selectArticles().then((articles) => {
    res.status(200).send({articles})
  }).catch(next)
}