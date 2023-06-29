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