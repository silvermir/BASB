import { ProductStore } from '../../models/product';
import Client from '../../database';

const store = new ProductStore();

describe('Product Model', () => {
  afterAll(async () => {
    const conn = await Client.connect();
    const sql = 'TRUNCATE TABLE products RESTART IDENTITY CASCADE;';
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

  it('should add a product', async () => {
    const result = await store.create({
      product_name: 'playstation',
      price: 449,
      category: 'gaming'
    });
    expect(result).toEqual({
      id: 1,
      product_name: 'playstation',
      price: 449,
      category: 'gaming'
    });
  });

  it('should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        product_name: 'playstation',
        price: 449,
        category: 'gaming'
      }
    ]);
  });

  it('should return the correct product', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      product_name: 'playstation',
      price: 449,
      category: 'gaming'
    });
  });

  it('should remove the product', async () => {
    store.delete('1');
    store.delete('2');
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
