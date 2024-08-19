import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { authorizeRole } from '../auth/authorizeRole';
import authController from '../auth/authController';
import userController from '../web/userController';

const userRouter = Router();

userRouter.post('/signUp', authController.signUp);
userRouter.post('/signIn', authController.signIn);

userRouter.get(
  '/users',
  authenticateJWT,
  authorizeRole(['admin', 'customer', 'driver']),
  userController.GetAll,
);

userRouter.get(
  '/users/:id',
  authenticateJWT,
  authorizeRole(['admin', 'customer', 'driver']),
  userController.FindOneById,
);
userRouter.get(
  '/users/email/:email',
  authenticateJWT,
  authorizeRole(['admin', 'customer', 'driver']),
  userController.FindOneByEmail,
);

userRouter.delete(
  '/users/:id',
  authenticateJWT,
  authorizeRole(['admin', 'customer', 'driver']),
  userController.DeleteOne,
);

userRouter.patch(
  '/users/:id',
  authenticateJWT,
  authorizeRole(['admin', 'customer', 'driver']),
  userController.UpdateUser,
);

userRouter.get(
  '/admin',
  authenticateJWT,
  authorizeRole(['admin', 'customer', 'driver']),
  (req, res) => {
    res.send('Acesso concedido ao admin.');
  },
);

export default userRouter;
