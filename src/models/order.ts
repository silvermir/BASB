import Client from "../database";

export type Order = {
  id?: Number;
  status: boolean;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
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
      const sql = "SELECT * FROM orders WHERE id=($1)";
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
        "INSERT INTO orders(id, status, user_id) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [o.id, o.status, o.user_id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`cant get order ${o}. ${e}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`cant delete order ${id}. Error: ${e}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, prodcut_id) VALUES ($1, $2, $3) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (e) {
      throw new Error(
        `could not add Product ${productId} to order ${orderId}: ${e}`
      );
    }
  }
}
