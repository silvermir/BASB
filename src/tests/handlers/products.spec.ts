import supertest from 'supertest';
import app from '../../server';
import Client from '../../database';

const request = supertest(app);
let token: string;

describe('Test endpoint /products response', () => {
  beforeAll(async () => {
    const response = await request.post('/users/register').send({
      first_name: 'test',
      last_name: 'tester',
      username: 'testuser',
      password: 'passwordZ'
    });
    expect(response.status).toBe(200);
    token = response.body;
  });

  afterAll(async () => {
    const conn = await Client.connect();
    const sql = 'TRUNCATE TABLE products RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
  });

  it('should get create endpoint', async () => {
    const response = await request
      .post('/products')
      .send({
        product_name: 'PlayStation',
        price: 449,
        category: 'Gaming'
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should get products index endpoint', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('should get products show endpoint', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('should get products delete endpoint', async () => {
    const response = await request.delete('/products/1');
    expect(response.status).toBe(200);
  });
});
