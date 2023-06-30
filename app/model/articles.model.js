const db = require('../../db/connection')

exports.selectArticles = () => {
  return db.query(`
  SELECT 
  a.*,
  COUNT(c.comment_id) as comment_count
  FROM articles a 
  JOIN comments c
  ON a.article_id = c.article_id
  GROUP BY a.article_id
  ORDER BY created_at DESC;`)
  .then(({rows}) => {
    return rows;
  })
}

exports.selectArticleById = (id) => {
  return db.query(`
  SELECT 
  a.*,
  COUNT(c.comment_id) as comment_count
  FROM articles a 
  LEFT JOIN comments c
  ON a.article_id = c.article_id
  WHERE a.article_id = $1
  GROUP BY a.article_id`, [id])
   .then(({rows}) => {
    if(!rows.length) {
      return Promise.reject({status: 404, msg: 'Not found'})
    }
    return rows[0];
   })
}
exports.selectCommentsByArticleId = (id) => {
  return this.selectArticleById(id)
    .then(() => {
      return db.query("SELECT * FROM comments WHERE article_id = $1", [id])
    })
    .then(({rows}) => {
      return rows;
    })
}