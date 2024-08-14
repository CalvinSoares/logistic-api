import { Router } from 'express';
import { signUp, singIn } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const userRouter = Router();

userRouter.post('/signUp', signUp);
userRouter.post('/signIn', singIn);
// userRouter.post('/login', login);

// Rotas protegidas (exemplo de rota para admin)
userRouter.get('/admin', authenticateJWT, (req, res) => {
  res.send('Acesso concedido ao admin.');
});

export default userRouter;
