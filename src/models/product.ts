import Client from "../database";

export type Product = {
  id?: Number;
  product_name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`cant get product ${e}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`cant get product ${id}. Error: ${e}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products(id, product_name, price, category) VALUES($1, $2, $3, $4) RETURNING *";
      const result = await conn.query(sql, [
        p.id,
        p.product_name,
        p.price,
        p.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`cant get product ${p.product_name}. ${e}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`cant delete product ${id}. Error: ${e}`);
    }
  }
}
