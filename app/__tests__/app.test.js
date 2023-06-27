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
  test('200: returns a list of all articles', () => {
    return request(app)
      .get('/api/articles')
      // .expect(200)
      .then(({body: {articles}}) => {
        // expect(articles.length).toBe()
        // expect(Array.isArray(articles)).toBe(true)
        // articles.forEach(article => {
        //   expect(article).toMatchObject({
        //     article_id: expect.ant(Number),
        //     author: expect.any(String),
        //     title: expect.any(String),
        //     topic: expect.any(String),
        //     created_at: expect.any(String),
        //     article_img_url: expect.any(String),
        //     comment_count: expect.ant(Number),
        //     votes: expect.ant(Number)
        //   })
        // })
      })
  })
})