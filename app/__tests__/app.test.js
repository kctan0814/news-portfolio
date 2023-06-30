const request = require('supertest')
const app = require('../app')
const connection = require('../../db/connection')
const seed = require('../../db/seeds/seed')
const data = require('../../db/data/test-data/index')
const endpointsJSON = require('../data/endpoints.json')

beforeEach(() => seed(data));

afterAll(() => connection.end());

describe('GET /api/topics', () => {
  test('200: returns the list of all the topics to the client', () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({body: {topics}}) => {
        expect(topics.length).toBe(3)
        expect(Array.isArray(topics)).toBe(true)
        topics.forEach(topic => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String)
          })
        })
      })
  })
})

describe('GET /api', () => {
  test('200: should return a JSON object with available endpoints to the api', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({body: {endpoints}}) => {
        expect(endpoints).toEqual(endpointsJSON);
      })
  })
})

describe('GET /api/articles', () => {
  test('200: serves the article with the provided id', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({body: {article}}) => {
        expect(article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          comment_count: '11',
        })
      })
  })
  test('400: returns a message "Bad request" when id passed is NaN', () => {
    return request(app)
      .get('/api/articles/george')
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe('Bad request')
      })
  })
  test('404: returns a message "Not found" if article with the given id does not exist', () => {
    return request(app)
      .get('/api/articles/9999')
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toBe('Not found')
      })
  })
  test('200: returns a list of all articles', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({body: {articles}}) => {
        expect(articles.length).toBe(5)
        expect(Array.isArray(articles)).toBe(true)
        articles.forEach(article => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            author: expect.any(String),
            title: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
            votes: expect.any(Number)
          })
        })
      })
  })
  test('200: the returned results must be sorted by date in descending order', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({body: {articles}}) => {
        expect(articles).toBeSortedBy('created_at', {descending: true})
      })
  })
  test('200: should return all the comments from the specified article', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({body: {comments}}) => {
        expect(comments.length).toBe(11)
        expect(Array.isArray(comments)).toBe(true)
        comments.forEach(comment => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 1
          })
        })
      })
  })
  test('200: returns an empty array if article exist with no comments', () => {
    return request(app)
      .get('/api/articles/4/comments')
      .expect(200)
      .then(({body: {comments}}) => {
        expect(comments.length).toBe(0)
        expect(Array.isArray(comments)).toBe(true)
      })
  })
  test('404: retruns an error message of "Not foumd" when passed with an article id not in the database', () => {
    return request(app)
      .get('/api/articles/99999/comments')
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toBe('Not found')
      })
  })
  test('400: returns a message "Bad request" when id passed is NaN', () => {
    return request(app)
      .get('/api/articles/bingbong/comments')
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe('Bad request')
      })
  })
})