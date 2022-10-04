import express, { Request, Response } from 'express';
import { Order, OrderProduct, OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/jwtAuth';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  const order: Order = {
    order_status: req.body.order_status,
    user_id: req.body.user_id
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
  const OP: OrderProduct = {
    id: parseInt(req.params.id),
    quantity: req.body.quantity,
    order_id: req.body.order_id,
    product_id: req.body.product_id
  };
  try {
    const addedProduct = await store.addProduct(OP);
    res.json(addedProduct);
  } catch (e) {
    res.status(400);
    res.json(`couldnt add product to order: ${e}`);
  }
};

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const order_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

export default order_routes;
