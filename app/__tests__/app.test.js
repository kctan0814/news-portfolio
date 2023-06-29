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

// describe('POST /api/articles', () => {
//   test.only('200: inserts body into the comments table in the database and returns the insered data', () => {
//     const bodyToSend = {
//       username: 'kctan36',
//       body: 'This is my first time commenting here ever!! omg!!!'
//     }
//     return request(app)
//       .post('/api/articles/5/comments')
//       .send(bodyToSend)
//       .expect(200)
//       .then(({body: {comment}}) => {
//         expect(comment).toMatchObject({
//           comment_id: expect.any(Number),
//           article_id: 5,
//           votes: 0,
//           created_at: expect.any(String),
//           author: bodyToPass.username,
//           body: bodyToPass.body
//         })
//       })
//   })
//   test('400: returns an error mesagge of "Bad request" when id passed is not a number', () => {
//     const bodyToSend = {
//       username: 'kctan36',
//       body: 'This is my first time commenting here ever!! omg!!!'
//     }
//     return request(app)
//       .post('/api/articles/bingbong/comments')
//       .send(bodyToSend)
//       .expect(400)
//       .then(({body: {msg}}) => {
//         expect(msg).toBe('Bad request')
//       })
//   })
//   test('404: returns an error mesagge of "Not found" when article_id passed does not exist in database', () => {
//     const bodyToSend = {
//       username: 'kctan36',
//       body: 'This is my first time commenting here ever!! omg!!!'
//     }
//     return request(app)
//       .post('/api/articles/123456/comments')
//       .send(bodyToSend)
//       .expect(404)
//       .then(({body: {msg}}) => {
//         expect(msg).toBe('Not found')
//       })
//   })
//   test('400: returns an error mesagge of "Bad request" when body passed does not fit the schema', () => {
//     const bodyToSend = {
//       nameuser: 'kctan36',
//       comment: 'This is my first time commenting here ever!! omg!!!'
//     }
//     return request(app)
//       .post('/api/articles/1/comments')
//       .send(bodyToSend)
//       .expect(400)
//       .then(({body: {msg}}) => {
//         expect(msg).toBe('Bad request')
//       })
//   })
//   test('400: returns an error mesagge of "Bad request" when body passed is empty', () => {
//     const bodyToSend = {}
//     return request(app)
//       .post('/api/articles/4/comments')
//       .send(bodyToSend)
//       .expect(400)
//       .then(({body: {msg}}) => {
//         expect(msg).toBe('Bad request')
//       })
//   })
// })