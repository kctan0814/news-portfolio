const db = require('../../db/connection')

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
  return db.query('INSERT INTO comments (')
}

// error when article_id is Nan
// error when article_id does not exist
// error when body does not fit schema
// error when body is empty
// if ok: 200 with inserted data returned to client