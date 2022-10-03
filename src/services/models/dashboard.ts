import Client from '../../database';

export class DashboardQueries {
  //get products in orders
  async productsInOrders(): Promise<
    { product_name: string; price: number; order_id: number }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT product_name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (e) {
      throw new Error(`unable to get products in orders: ${e}`);
    }
  }

  async usersWithOrders(): Promise<{ username: string }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT username FROM users INNER JOIN orders ON users.id = orders.user_id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (e) {
      throw new Error(`unable to get users with orders: ${e}`);
    }
  }
}
