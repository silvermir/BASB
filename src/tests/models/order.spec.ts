import { OrderStore } from '../../models/order';
import { ProductStore } from '../../models/product';
import { UserStore } from '../../models/user';

const store = new OrderStore();

describe('Order Model', () => {
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

  beforeAll(async () => {
    const user = new UserStore();
    const product = new ProductStore();
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

  it('should add a order', async () => {
    const result = await store.create({
      user_id: 1,
      order_status: true
    });
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      order_status: true
    });
  });

  it('should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        order_status: true
      }
    ]);
  });

  it('should return the correct product', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      order_status: true
    });
  });

  it('should remove the product', async () => {
    store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
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
});
