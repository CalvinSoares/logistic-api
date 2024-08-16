import { TypeOrder } from '../@types/orderType';
import { CreateOrderDTO, OrderDTO } from '../dto/orderDto';
import { IOrder, Order } from '../models/orderModel';
import { transformToOrderDTO } from '../utils/converterDTO/transformToOrderDTO';

class OrderService {
  async getAll() {
    const order = (await Order.find().lean()) as TypeOrder[] | null;
    if (!order) {
      return null;
    }
    return order.map((o) => transformToOrderDTO(o));
  }

  async findByUserName(userName: string) {
    const order = (await Order.findOne({
      userName,
    }).lean()) as TypeOrder | null;
    if (!order) {
      return null;
    }
    const orderDTO = transformToOrderDTO(order);
    return orderDTO;
  }

  async findByEmail(email: string) {
    console.log(email);
    const order = (await Order.findOne({
      email,
    }).lean()) as TypeOrder | null;
    if (!order) {
      return null;
    }
    const orderDTO = transformToOrderDTO(order);
    return orderDTO;
  }

  async findById(id: string) {
    const order = (await Order.findById(
      id,
      {},
      { lean: true },
    )) as TypeOrder | null;

    if (!order) {
      return null;
    }
    const orderDTO = transformToOrderDTO(order);
    return orderDTO;
  }

  async add(order: CreateOrderDTO) {
    const orderCreated = (await Order.create(order)) as TypeOrder | null;

    if (!orderCreated) {
      return null;
    }
    const orderDTO = transformToOrderDTO(orderCreated);
    return orderDTO;
  }

  async updateById(id: string, order: CreateOrderDTO) {
    const orderUpdated = (await Order.findByIdAndUpdate(
      id,
      { $set: order },
      {
        new: true,
        lean: true,
      },
    )) as TypeOrder | null;

    if (!order) {
      return null;
    }
    const orderDTO = transformToOrderDTO(orderUpdated);
    return orderDTO;
  }

  async deleteById(id: string) {
    const orderDeleted = (await Order.findByIdAndDelete(
      id,
    )) as TypeOrder | null;

    if (!orderDeleted) {
      return null;
    }
    const OrderDTO = transformToOrderDTO(orderDeleted);
    return OrderDTO;
  }
}

export default new OrderService();
