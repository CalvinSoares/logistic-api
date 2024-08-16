import { Router } from 'express';

import orderController from '../web/orderController';

const orderRouter = Router();
//esta ok
orderRouter.get('/orders', orderController.getOrders);
//esta ok
orderRouter.get('/orders/:id', orderController.getOrderById);
orderRouter.get('/orders/user/:userName', orderController.getOrderByUser);
orderRouter.get('/orders/email/:email', orderController.getOrderByEmail);
//esta ok
orderRouter.post('/orders', orderController.createOrder);
//esta ok
orderRouter.patch('/orders/:id', orderController.updateOrder);

orderRouter.delete('/orders/:id', orderController.deleteOrder);

export default orderRouter;
