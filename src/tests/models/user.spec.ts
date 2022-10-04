import { UserStore } from '../../models/user';
import Client from '../../database';

const store = new UserStore();

describe('User Model', () => {
  afterAll(async () => {
    const conn = await Client.connect();
    const sql = 'TRUNCATE TABLE users RESTART IDENTITY CASCADE;';
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

  it('should add a user', async () => {
    const result = await store.create({
      id: 1,
      username: 'test',
      password: '123456789'
    });
    expect(result.username).toBe('test');
  });

  it('should return a list of users', async () => {
    const result = await store.index();
    //couldnt find a better way to test
    const conn = await Client.connect();
    const sql = 'SELECT * FROM users';
    const userData = await conn.query(sql);
    conn.release();
    expect(result).toEqual([userData.rows[0]]);
  });

  it('should return selected user', async () => {
    const result = await store.show('1');
    expect(result.username).toBe('test');
  });

  it('should remove selected user', async () => {
    store.delete('1');
    const result = await store.index();
    console.log(result);
    expect(result).toEqual([]);
  });
});
