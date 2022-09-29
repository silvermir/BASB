import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../utilities/jwtAuth';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const user = await store.index();
  res.json(user);
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const authencicate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password
  };
  try {
    const userLogin = await store.authenticate(
      user.username,
      user.password as string
    );
    const token = jwt.sign(
      { user: userLogin },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users/register', create);
  app.post('/users/login', verifyAuthToken, authencicate);
};

export default user_routes;
