import Client from '../../../database';
import { DashboardQueries } from '../../../services/models/dashboard';

const store = new DashboardQueries();

describe('Dashboard Model', () => {
  afterAll(async () => {
    const conn = await Client.connect();
    const sql = 'TRUNCATE TABLE users RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
  });

  it('should have an product in orders method', () => {
    expect(store.productsInOrders).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.usersWithOrders).toBeDefined();
  });

  it('should return products in orders', async () => {
    const result = await store.productsInOrders();
    expect(result).toEqual(result);
  });

  it('should return users with orders ', async () => {
    const result = await store.usersWithOrders();
    expect(result).toEqual(result);
  });
});
