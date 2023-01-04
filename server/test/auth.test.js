const supertest = require('supertest');
const app = require('../index.js');

jest.setTimeout(10000);

describe('POST /api/auth/login', () => {
  describe('give invalid credentials', () => {
    it('should response with a 400 status code', async () => {
      const response = await supertest(app).post('/api/auth/login').send({
        email: 'John',
        password: '123456',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('give valid credentials', () => {
    it('should response with a 200 status code', async () => {
      const response = await supertest(app).post('/api/auth/login').send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
