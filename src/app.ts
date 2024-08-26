import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import userRouter from './routes/userRoutes';
import orderRouter from './routes/orderRoutes';
import pdfRouter from './routes/pdfRoutes';
import routerML from './integrations/mercadoLivre/routes/mercadoLivreRoute';
import { RequestSession } from './@types/RequestSession';
import path from 'path';

const app = express();

app.use(express.urlencoded({ limit: '90mb', extended: true }));
app.use(cors());
app.use(express.json({ limit: '90mb' }));
app.use(userRouter);
app.use(orderRouter);
app.use(pdfRouter);
app.use(routerML);

app.get('/set', (req: RequestSession, res: Response) => {
  console.log(req.headers);
  req.session.userSession = { email: 'erick@gmail.com' };
  res.send('Dado salvo na sessão!');
});

app.set('views', path.join(__dirname, '/views'));
app.get('/example', (req, res) => {
  res.render('successLoginML', {
    nameUser: 'Erick',
    message: 'Welcome to my application!',
  });
});

// Configurar o motor de template EJS
app.set('view engine', 'ejs');

app.get('/get', (req: RequestSession, res: Response) => {
  const dado = req.session.userSession?.email ?? 'Nenhum dado definido';
  res.send(`Dado da sessão: ${dado}`);
});

export default app;
