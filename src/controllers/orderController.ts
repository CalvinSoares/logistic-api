import { Request, Response } from 'express';
import { Order } from '../models/orderModel';

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
}

export default new OrderController();

// export const getOrders = async (req: Request, res: Response) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: 'Erro ao buscar pedidos', error: err });
//   }
// };

// export const getOrderById = async (req: Request, res: Response) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: 'Pedido não encontrado' });
//     }
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: 'Erro ao buscar pedido', error: err });
//   }
// };

export const createOrder = async (req: Request, res: Response) => {
  const {
    orderId,
    packageId,
    status,
    userName,
    deliveryDate,
    address,
    price,
    plano,
    phone,
    email,
  } = req.body;
  try {
    const newOrder = new Order({
      orderId,
      packageId,
      status,
      userName,
      deliveryDate,
      address,
      price: parseFloat(price),
      plano,
      phone,
      email,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar pedido', error: err });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar pedido', error: err });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar pedido', error: err });
  }
};
