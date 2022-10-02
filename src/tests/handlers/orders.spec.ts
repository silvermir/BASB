import supertest from 'supertest';
import app from '../../server';
import Client from '../../database';
import { ProductStore } from '../../models/product';
import { OrderStore } from '../../models/order';

const request = supertest(app);
const product = new ProductStore();
const order = new OrderStore();

let token: string;

describe('Test endpoint /orders response', () => {
  beforeAll(async () => {
    const response = await request.post('/users/register').send({
      first_name: 'test',
      last_name: 'tester',
      username: 'testuser',
      password: 'passwordZ'
    });
    expect(response.status).toBe(200);
    token = response.body;

    await product.create({
      product_name: 'playstation',
      price: 500,
      category: 'gaming'
    });

    await order.create({
      order_status: 'active',
      user_id: 1
    });
  });
  afterAll(async () => {
    const conn = await Client.connect();
    const sql = 'TRUNCATE TABLE users RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
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
      .send({
        order_id: 1,
        product_id: 1,
        quantity: 5
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
