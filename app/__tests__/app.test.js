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