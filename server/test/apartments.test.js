const supertest = require('supertest');
const app = require('../index.js');

describe('CRUD on apartment', () => {
  // create a new apartment
  describe('POST /api/apartments', () => {
    it('it should create a new apartment and', async () => {
      const response = await supertest(app)
        .post('/api/apartments')
        .send({
          number: Math.floor(Math.random() * 1000),
          building: '63b688ba71db9abfa23aee97',
          status: 'vacant',
        });
      expect(response.statusCode).toBe(200);
    });
  });

  // get all apartments
  describe('GET /api/apartments', () => {
    it('it should get all apartments', async () => {
      const response = await supertest(app).get('/api/apartments');
      expect(response.body.success).toBe(true);
    });
  });

  // update an apartment
  // assuming there is an apartment with number 1
  describe('PUT /api/apartments/:id', () => {
    it('it should update an apartment', async () => {
      const response = await supertest(app).put('/api/apartments/1').send({
        status: 'vacant',
      });
      expect(response.statusCode).toBe(200);
    });
  });

  // delete an apartment
  // assuming there is an apartment with number 1
  describe('DELETE /api/apartments/:id', () => {
    it('it should delete an apartment', async () => {
      const response = await supertest(app).delete('/api/apartments/1');
      expect(response.statusCode).toBe(200);
    });
  });
});
