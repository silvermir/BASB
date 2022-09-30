import supertest from 'supertest';
import app from '../../server';
import Client from '../../database';

const request = supertest(app);
let token: string;

describe('Test endpoint /orders response', () => {
  afterAll(async () => {
    const conn = await Client.connect();
    const sql = 'TRUNCATE TABLE users RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
  });

  it('should get users register/create endpoint', async () => {
    const response = await request.post('/users/register').send({
      first_name: 'first Dummy',
      last_name: 'last Dummy',
      username: 'test',
      password: 'password1424'
    });
    expect(response.status).toBe(200);
    token = response.body;
  });

  it('should get orders create endpoint', async () => {
    const response = await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should get orders index endpoint', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should get orders show endpoint', async () => {
    const response = await request
      .get('/orders/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should get orders addProduct endpoint', async () => {
    const response = await request
      .post('/orders/1/products')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
