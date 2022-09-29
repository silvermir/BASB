import Client from '../database';

export type Order = {
  id?: number;
  order_status: boolean;
  user_id: number;
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`cant get order ${e}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`cant get order ${id}. Error: ${e}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders(order_status, user_id) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.order_status, o.user_id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`cant get order ${o}. ${e}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`cant delete order ${id}. Error: ${e}`);
    }
  }

  async addProduct(OP: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        OP.order_id,
        OP.product_id,
        OP.quantity
      ]);
      const OrderProduct = result.rows[0];
      conn.release();
      return OrderProduct;
    } catch (e) {
      throw new Error(
        `could not add Product ${OP.product_id} to order ${OP.order_id}: ${e}`
      );
    }
  }
}
