import supertest from 'supertest';
import app from '../../../server';
import Client from '../../../database';

const request = supertest(app);

describe('Test endpoint /users response', () => {
  afterAll(async () => {
    const conn = await Client.connect();
    const sql = 'TRUNCATE TABLE users RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
  });

  it('should get products In Orders endpoint', async () => {
    const response = await request.get('/products_in_orders');
    expect(response.status).toBe(200);
  });

  it('should get users With Orders endpoint', async () => {
    const response = await request.get('/users_with_orders');
    expect(response.status).toBe(200);
  });
});
