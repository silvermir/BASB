import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import verifyAuthToken from "../utilities/jwtAuth";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    order_status: req.body.status,
    user_id: req.body.user_id,
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (e) {
    res.status(400);
    res.json(`couldnt create order: ${e}`);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const quantity: number = parseInt(req.body.quantity);
  const order_id: number = parseInt(req.params.id);
  const product_id: number = parseInt(req.body.product_id);
  try {
    const addedProduct = await store.addProduct(quantity, order_id, product_id);
    res.json(addedProduct);
  } catch (e) {
    res.status(400);
    res.json(`couldnt add product to order: ${e}`);
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
};

export default order_routes;
