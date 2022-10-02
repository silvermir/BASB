import { OrderStore } from '../../models/order';
import { ProductStore } from '../../models/product';
import { UserStore } from '../../models/user';
import Client from '../../database';

const store = new OrderStore();
const user = new UserStore();
const product = new ProductStore();

describe('Order Model', () => {
  beforeAll(async () => {
    await user.create({
      first_name: 'first Dummy',
      last_name: 'last Dummy',
      username: 'test',
      password: 'password1424'
    });
    await product.create({
      product_name: 'playstation',
      price: 449,
      category: 'gaming'
    });
  });

  afterAll(async () => {
    const conn = await Client.connect();
    const sql =
      'TRUNCATE TABLE users RESTART IDENTITY CASCADE; \n TRUNCATE TABLE products RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
  });
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should have a addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('should add a order', async () => {
    const result = await store.create({
      id: 1,
      user_id: 1,
      order_status: 'active'
    });
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      order_status: 'active'
    });
  });

  it('should add product to an order', async () => {
    const result = await store.addProduct({
      order_id: 1,
      product_id: 1,
      quantity: 5
    });
    expect(result).toEqual({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 5
    });
  });

  it('should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        order_status: 'active'
      }
    ]);
  });

  it('should return the correct order', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      order_status: 'active'
    });
  });

  it('should remove the order', async () => {
    store.delete('1');
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
