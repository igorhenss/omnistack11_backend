const request = require('supertest');
const app = require('../../src/app');
const conn = require('../../src/database/connection');

describe('NGO', () => {
  beforeEach(async () => {
    await conn.migrate.latest();
  });

  afterAll(async () => {
    await conn.migrate.rollback();
    await conn.destroy();
  })

  it('should create new NGO', async () => {
    const response = await request(app).post('/ngo/register')
      .send({
        name: "Test",
        email: "test@test.com",
        whatsapp: "44920005722",
        city: "Sarandi",
        fu: "PR"
      });
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(16);
  });
});