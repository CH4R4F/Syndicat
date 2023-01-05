const supertest = require('supertest');
const app = require('../index.js');

describe('CRUD on apartment', () => {
  let apartmentNumber = null;
  // create a new apartment and get its number
  beforeAll(async () => {
    const response = await supertest(app)
      .post('/api/apartments')
      .send({
        number: Math.floor(Math.random() * 1000),
        building: '63b688ba71db9abfa23aee97',
        status: 'vacant',
      });
    apartmentNumber = response.body.newApartment.number;
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
      const response = await supertest(app).put(`/api/apartments/${apartmentNumber}`).send({
        status: 'vacant',
      });
      expect(response.statusCode).toBe(200);
    });
  });

  // delete an apartment
  // assuming there is an apartment with number 1
  describe('DELETE /api/apartments/:id', () => {
    it('it should delete an apartment', async () => {
      const response = await supertest(app).delete(`/api/apartments/${apartmentNumber}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
