const db = require('../../db/connection')
const { sort } = require('../../db/data/test-data/articles')
const { getTopics } = require('../controller/topics.controller')
const { selectTopics } = require('./topics.model')

exports.selectArticles = (topic, sort_by = 'created_at', order = 'DESC') => {
  return selectTopics().then((topics) => {
    const capsOrder = order.toUpperCase();
    const validTopics = topics.map(topic => topic.slug);
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
    ON a.article_id = c.article_id `

    
    if (topic) toQuery += `WHERE a.topic = ${topic} `
    toQuery += `GROUP BY a.article_id ORDER BY a.${sort_by} ${capsOrder}`
    console.log(toQuery)
    console.log(db.query(toQuery))
    // return db.query(toQuery)
  })  
  .then(({rows}) => {
    console.log(rows)
    // return rows;
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