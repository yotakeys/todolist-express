import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes';
import userRoutes from './routes/userRoutes';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
    };
  }
}


const app = express();

app.use(bodyParser.json());
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);

export default app;
