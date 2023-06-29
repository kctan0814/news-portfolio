const db = require('../../db/connection')

exports.selectArticles = () => {
  return db.query(`
  SELECT 
  a.article_id, 
  a.author, 
  a.title, 
  a.topic, 
  a.created_at, 
  a.article_img_url,
  a.votes,
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
  return db.query("SELECT * FROM articles WHERE article_id = $1", [id])
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

exports.updateArticle = (id, body) => {
  const { inc_votes } = body;
  return this.selectArticleById(id)
    .then(() => {
      return db.query(`
      UPDATE articles 
      SET votes = (votes + $1) 
      WHERE article_id = $2 
      RETURNING *;`,
      [inc_votes, id])
    })
    .then(({rows}) => {
      return rows[0];
    })
}

/* 
Errors:
  404 - id does not exist
  400 - id is NaN
  400 - body does not fit schema
  400 - body is empty

If ok:
  200 - send the updated article
*/