import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { authorizeRole } from '../auth/authorizeRole';
import authController from '../auth/authController';
import userController from '../controllers/userController';

const userRouter = Router();

userRouter.post('/signUp', authController.signUp);
userRouter.post('/signIn', authController.signIn);

userRouter.get(
  '/users',
  authenticateJWT,
  authorizeRole(['admin']),
  userController.GetAll,
);

userRouter.get(
  '/users/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  userController.FindOneById,
);
userRouter.get(
  '/users/email/:email',
  authenticateJWT,
  authorizeRole(['admin']),
  userController.FindOneByEmail,
);

userRouter.delete(
  '/users/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  userController.DeleteOne,
);

userRouter.patch(
  '/users/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  userController.UpdateUser,
);

userRouter.get(
  '/admin',
  authenticateJWT,
  authorizeRole(['admin']),
  (req, res) => {
    res.send('Acesso concedido ao admin.');
  },
);

export default userRouter;
