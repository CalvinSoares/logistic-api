import { Request, Response } from 'express';
import { Order } from '../models/orderModel';
import { Console } from 'console';
import { create } from 'domain';
import { TypeOrder } from '../@types/orderType';
import { transformToOrderDTO } from '../utils/converterDTO/transformToOrderDTO';
import orderService from '../services/orderService';
import { TypeRequestUser } from '../@types/userType';

class OrderController {
  async getOrders(req: TypeRequestUser, res: Response) {
    const { user } = req;
    try {
      if (user?.role !== 'admin') {
        const orders = await orderService.getAllByEmail(user?.email);
        if (!orders) {
          return res
            .status(404)
            .json({ message: 'Orders not found for this user' });
        }
        return res.status(200).json(orders);
      }
      const orders = await orderService.getAll();
      if (!orders) {
        return res.status(404).json({ message: 'Order not found' });
      }

      return res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Error get all order', error: err });
    }
  }

  async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const order = await orderService.findById(id);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: 'Error search order', error: err });
    }
  }

  async getOrderByUser(req: Request, res: Response) {
    const { userName } = req.params;
    try {
      const order = await orderService.findByUserName(userName);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error search order', error: (err as Error).message });
    }
  }

  async getOrderByEmail(req: Request, res: Response) {
    const { email } = req.params;
    try {
      const order = await orderService.findByEmail(email);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error search order', error: (err as Error).message });
    }
  }

  async createOrder(req: Request, res: Response) {
    const order = req.body;
    console.log(order);
    try {
      const orderCreated = await orderService.add(order);
      res.status(201).json(orderCreated);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar pedido', error: err });
    }
  }

  async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const order = req.body;
    try {
      const orderUpdated = await orderService.updateById(id, order);
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
      const orderDeleted = await orderService.deleteById(id);
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
