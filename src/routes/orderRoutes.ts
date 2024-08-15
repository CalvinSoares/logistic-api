import { Router } from 'express';
import {
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController';
import { getAllOrders } from '../services/orderController';

import orderController from '../controllers/orderController';

const orderRouter = Router();
//esta ok
orderRouter.get('/orders', orderController.getOrders);
//esta ok
orderRouter.get('/orders/:id', orderController.getOrderById);

orderRouter.post('/admin/orders', createOrder);
orderRouter.put('/admin/orders/:id', updateOrder);
orderRouter.delete('/admin/orders/:id', deleteOrder);

orderRouter.get('/driver/orders', getAllOrders);
orderRouter.put('/driver/orders/:id/status', updateOrder);

export default orderRouter;
