import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import product_routes from './handlers/products';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';
import dashboard_routes from './services/handlers/dashboard';

const app: express.Application = express();
const address = '0.0.0.0:3000';

const corsOptions = {
  origin: 'http://test.com',
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

product_routes(app);
user_routes(app);
order_routes(app);
dashboard_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
