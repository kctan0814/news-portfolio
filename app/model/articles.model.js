const db = require('../../db/connection');
const { formatComment } = require('./utils');

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

exports.insertComment = (id, comment) => {
  const formattedComment = formatComment(id, comment)
  return this.selectArticleById(id)
    .then(() => {
      return db.query(`
      INSERT INTO comments 
      (author, body, created_at, article_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`, formattedComment)
    })
    .then(({rows}) => {
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