const db = require('../../db/connection')

exports.createComment = (id, comment) => {
  return db.query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then(({rows}) => {
      return rows;
    })
}

// error if article_id does not exists - Not found?
// error if article_id is NaN 
// error if body does not have the correct properties - Bad request
// error if body is empty - Bad request
