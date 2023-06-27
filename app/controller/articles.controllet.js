const { selectArticleById } = require("../model/articles.model");

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;
  selectArticleById(article_id).then(article => {
    res.status(200).send({article})
  })
}