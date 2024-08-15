import { Router } from 'express';
import { getAllOrders } from '../services/orderController';

import orderController from '../controllers/orderController';

const orderRouter = Router();
//esta ok
orderRouter.get('/orders', orderController.getOrders);
//esta ok
orderRouter.get('/orders/:id', orderController.getOrderById);
//esta ok
orderRouter.post('/orders', orderController.createOrder);
//esta ok
orderRouter.patch('/orders/:id', orderController.updateOrder);

orderRouter.delete('/orders/:id', orderController.deleteOrder);

// orderRouter.get('/driver/orders', getAllOrders);
// orderRouter.put('/driver/orders/:id/status', orderController.updateOrder);

export default orderRouter;
