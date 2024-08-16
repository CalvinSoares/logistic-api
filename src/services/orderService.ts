import { TypeOrder } from '../@types/orderType';
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
}

export default new OrderService();
