import { Router } from 'express';
import {
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
} from '../controllers/orderController';
import { getAllOrders } from '../services/orderController';

const orderRouter = Router();

orderRouter.get('/admin/orders/all', getOrders);
orderRouter.get('/orders/:id', getOrderById);
orderRouter.post('/admin/orders', createOrder);
orderRouter.put('/admin/orders/:id', updateOrder);
orderRouter.delete('/admin/orders/:id', deleteOrder);

orderRouter.get('/driver/orders', getAllOrders);
orderRouter.put('/driver/orders/:id/status', updateOrder);

export default orderRouter;
