import { TypeOrder } from '../@types/orderType';
import { CreateOrderDTO } from '../dto/orderDto';
import { IOrder, Order } from '../models/orderModel';
import { transformToOrderDTO } from '../utils/converterDTO/transformToOrderDTO';

class OrderService {
  async getAllOrders() {
    const order = (await Order.find().lean()) as TypeOrder[] | null;
    if (!order) {
      return null;
    }
    return order.map((o) => transformToOrderDTO(o));
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

  async addOrder(order: CreateOrderDTO) {
    const orderCreated = (await Order.create(order)) as TypeOrder | null;

    if (!orderCreated) {
      return null;
    }
    const orderDTO = transformToOrderDTO(orderCreated);
    return orderDTO;
  }
}

export default new OrderService();
