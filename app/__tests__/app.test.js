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
  test('200: posts the passed body into the comments table and returns the new row added', () => {
    const bodyToPass = {
      username: 'kctan36',
      body: 'This is my first time commenting here guys!'
    }
    return request(app)
      .post('/api/articles/5/comments', bodyToPass)
      // .expect(200)
      .then(({body: {comment}}) => {
        // expect(comment).toMatchObject({
        //   article_id: 5,
        //   votes: 0,
        //   created_at: expect.any(String),
        //   comment_id: expect.any(Number),
        //   ...bodyToPass
        // })
      })
  })
  test('404: returns "Not found" when the article id does not exist', () => {
    const bodyToPass = {
      username: 'kctan36',
      body: 'This is my first time commenting here guys!'
    }
    return request(app)
      .post('/api/articles/1230/comments', bodyToPass)
      // .expect(404)
      .then(({body: {msg}}) => {
        // expect(msg).toBe('Not found')
      })
  })
  test('400: returns "Bad request" when article id passed in not a number', () => {
    const bodyToPass = {
      username: 'kctan36',
      body: 'This is my first time commenting here guys!'
    }
    return request(app)
      .post('/api/articles/bingbong/comments', bodyToPass)
      // .expect(400)
      .then(({body: {msg}}) => {
        // expect(msg).toBe('Bad request')
      })
  })
  test('400: returns "Bad request" when the body passed does not fit the schema', () => {
    const bodyToPass = {
      name: 'kctan36',
      comment: 'This is my first time commenting here guys!'
    }
    return request(app)
      .post('/api/articles/5/comments', bodyToPass)
      // .expect(400)
      .then(({body: {msg}}) => {
        // expect(msg).toBe('Bad request')
      })
  })
  test('400: returns "Bad request" when the body passed is empty', () => {
    const bodyToPass = {}
    return request(app)
      .post('/api/articles/5/comments', bodyToPass)
      // .expect(400)
      .then(({body: {msg}}) => {
        // expect(msg).toBe('Bad request')
      })
  })
})