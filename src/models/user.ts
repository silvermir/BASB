import Client from '../database';
import bcrypt from 'bcrypt';

const { PEPPER, saltRounds } = process.env;

export type User = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username: string;
  password?: string;
  password_digest?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`cant get user ${e}`);
    }
  }
  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`cant get user ${id}. Error: ${e}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *';

      const hash = bcrypt.hashSync(
        (u.password as string) + PEPPER,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [u.username, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`error creating user (${u.username}): ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT password_digest FROM users WHERE username=($1)';
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + PEPPER, user.password_digest)) {
          return user;
        }
      }
      return null;
    } catch (e) {
      throw new Error(`authentication error ${e}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`cant delete user ${id}. Error: ${e}`);
    }
  }
}
