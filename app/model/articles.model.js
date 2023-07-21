const db = require('../../db/connection')
const { selectTopics } = require('./topics.model')
const { formatComment } = require('./utils')

exports.selectArticles = (topic, sort_by = 'created_at', order = 'DESC') => {
  return selectTopics().then((topics) => {
    const capsOrder = order.toUpperCase();
    const validTopics = topics.map(topic => topic.slug);
    validTopics.push(undefined);
    const validSortBy = ['article_id', 'author', 'title', 'topic', 'created_at', 'votes']
    const validOrder = ['ASC', 'DESC']
    
    if (!validTopics.includes(topic)) {
      return Promise.reject({status: 400, msg: 'Bad request'})
    }
    if (!validSortBy.includes(sort_by)) {
      return Promise.reject({status: 400, msg: 'Bad request'})
    }
    if (!validOrder.includes(capsOrder)) {
      return Promise.reject({status: 400, msg: 'Bad request'})
    }

    let toQuery = `
    SELECT 
    a.*,
    COUNT(c.comment_id) as comment_count
    FROM articles a 
    LEFT JOIN comments c
    ON a.article_id = c.article_id `
    
    if (topic) toQuery += `WHERE a.topic = '${topic}' `
    toQuery += `GROUP BY a.article_id ORDER BY a.${sort_by} ${capsOrder}`
    return db.query(toQuery)
  })
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
      return db.query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC", [id])
    })
    .then(({rows}) => {

      return rows;
    })
}

exports.removeComment = (id) => {
  return db.query(`
    DELETE FROM comments 
    WHERE comment_id = $1
    RETURnING *;`, [id]
  )
  .then(({rows}) => {
    if(!rows.length) {
      return Promise.reject({status: 404, msg: 'Not found'})
    }
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
