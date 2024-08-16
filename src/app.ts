import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import orderRouter from './routes/orderRoutes';
const bodyParser = 'bodyParser';

const app = express();

app.use(express.urlencoded({ limit: '90mb', extended: true }));
app.use(cors());
app.use(express.json({ limit: '90mb' }));
app.use(userRouter);
app.use(orderRouter);

export default app;
