const request = require('supertest')
const app = require('../app')
const connection = require('../../db/connection')
const seed = require('../../db/seeds/seed')
const data = require('../../db/data/test-data/index')

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

describe('GET /api/articles', () => {
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
            article_id: expect.any(Number)
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
  test('400: retruns an error message of "Not foumd" when passed with an article id not in the database', () => {
    return request(app)
      .get('/api/articles/99999/comments')
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toBe('Not found')
      })
  })
})