import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const user = await store.index();
  res.json(user);
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.body.id);
    res.json(user);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    res.json(newUser);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const user_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
};

export default user_routes;
