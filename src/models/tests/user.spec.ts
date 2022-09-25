import { User, UserStore } from "../../models/user";

const store = new UserStore();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await store.create({
      first_name: "test",
      last_name: "test",
      username: "test",
      password: "123456",
    });
    expect(result).toEqual({
      first_name: "test",
      last_name: "test",
      username: "test",
      password: "123456",
    });
  });

  it("index method should return a list of user", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        first_name: "test",
        last_name: "test",
        username: "test",
        password: "123456",
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      first_name: "test",
      last_name: "test",
      username: "test",
      password: "123456",
    });
  });
});
