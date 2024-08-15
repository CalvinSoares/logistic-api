import { Request, Response } from 'express';
import { Order } from '../models/orderModel';
import { Console } from 'console';
import { create } from 'domain';

class OrderController {
  async getOrders(req: Request, res: Response) {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Error get all order', error: err });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: 'Error search order', error: err });
    }
  }

  async createOrder(req: Request, res: Response) {
    const order = req.body;
    try {
      const orderCreated = await Order.create({
        price: parseFloat(order.price),
        ...order,
      });
      res.status(201).json(orderCreated);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar pedido', error: err });
    }
  }

  async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const order = req.body;
    try {
      const orderUpdated = await Order.findByIdAndUpdate(
        id,
        { $set: order },
        {
          new: true,
        },
      );
      if (!order) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      res.status(200).json(orderUpdated);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar pedido', error: err });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const orderDeleted = await Order.findByIdAndDelete(id);
      if (!orderDeleted) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(orderDeleted);
    } catch (err) {
      res.status(500).json({ message: 'Error deleting order', error: err });
    }
  }
}

export default new OrderController();
