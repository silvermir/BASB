import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.index).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await store.create({
      id: 1,
      product_name: "test_product",
      price: 500,
      category: "test_category",
    });
    expect(result).toEqual({
      id: 1,
      product_name: "test_product",
      price: 500,
      category: "test_category",
    });
  });

  it("index method should return a list of books", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        product_name: "test_product",
        price: 500,
        category: "test_category",
      },
    ]);
  });

  it("show method should return the correct book", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      product_name: "test_product",
      price: 500,
      category: "test_category",
    });
  });

  it("delete method should remove the book", async () => {
    store.delete("1");
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
