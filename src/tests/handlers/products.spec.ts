import supertest from 'supertest';
import app from '../../server';
import Client from '../../database';

const request = supertest(app);
let token: string;

describe('Test endpoint /proucts response', () => {
  afterAll(async () => {
    const conn = await Client.connect();
    const sql = 'TRUNCATE TABLE products RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
  });

  it('should get product /create endpoint', async () => {
    const response = await request.post('/users/register').send({
      product_name: 'PlayStation',
      price: 449,
      category: 'Gaming'
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

  it('should not get orders create endpoint', async () => {
    const response = await request.post('/orders');
    expect(response.status).toBe(401);
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
