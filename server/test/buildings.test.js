const supertest = require('supertest');
const app = require('../index.js');

describe('CRUD on buildings', async () => {
  // create a new building and get its id
  const buildingId = null;
  beforeAll(async () => {
    const response = await supertest(app).post('/api/buildings').send({
      name: 'Building 1',
      address: '123 Main Street',
      city: 'New York',
      numberOfFloors: 10,
      numberOfApartments: 100,
    });
    buildingId = response.body.newBuilding._id;
  });

  // get all buildings
  describe('GET /api/buildings', () => {
    it('it should get all buildings', async () => {
      const response = await supertest(app).get('/api/buildings');
      expect(response.body.success).toBe(true);
    });
  });

  // update a building
  // assuming there is a building with the id
  describe('PUT /api/buildings/:id', () => {
    it('it should update a building', async () => {
      const response = await supertest(app).put(`/api/buildings/${buildingId}`).send({
        name: 'Building updated',
        address: '123 new address',
        city: 'Chicago',
        numberOfFloors: 5,
        numberOfApartments: 50,
      });
      expect(response.statusCode).toBe(200);
    });
  });

  // delete a building
  // assuming there is a building with the id
  describe('DELETE /api/buildings/:id', () => {
    it('it should delete a building', async () => {
      const response = await supertest(app).delete(`/api/buildings/${buildingId}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
