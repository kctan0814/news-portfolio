const db = require('../../db/connection')

exports.selectCommentsByArticleId = () => {
  return db.query()
}