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
})