import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import verifyAuthToken from "../utilities/jwtAuth";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (_req: Request, res: Response) => {
  const order = await store.show(_req.params.id);
  res.json(order);
};

const create = async (_req: Request, res: Response) => {
  const order: Order = {
    user_id: _req.body.user_id,
    status: true,
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", verifyAuthToken, create);
  app.post("/order/:id/products, addProduct");
};

export default order_routes;
