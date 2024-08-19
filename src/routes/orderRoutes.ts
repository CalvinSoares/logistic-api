import { Router } from 'express';

import orderController from '../web/orderController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const orderRouter = Router();
//esta ok
orderRouter.get('/orders', authenticateJWT, orderController.getOrders);
//esta ok
orderRouter.get('/orders/:id', authenticateJWT, orderController.getOrderById);
orderRouter.get(
  '/orders/user/:userName',
  authenticateJWT,
  orderController.getOrderByUser,
);
orderRouter.get(
  '/orders/email/:email',
  authenticateJWT,
  orderController.getOrderByEmail,
);
//esta ok
orderRouter.post('/orders', authenticateJWT, orderController.createOrder);
//esta ok
orderRouter.patch('/orders/:id', authenticateJWT, orderController.updateOrder);

orderRouter.delete('/orders/:id', authenticateJWT, orderController.deleteOrder);

export default orderRouter;
