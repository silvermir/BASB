import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(' ')[1];
    jwt.verify(token, TOKEN_SECRET as string);
    next();
  } catch (e) {
    res.status(401);
    res.send(`auhtentication error: ${e}`);
    return;
  }
};

export default verifyAuthToken;
