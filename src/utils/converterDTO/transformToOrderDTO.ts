import { TypeOrder } from '../../@types/orderType';
import { OrderDTO } from '../../dto/orderDto';

export const transformToOrderDTO = (order: TypeOrder | null): OrderDTO => {
  if (!order || typeof order !== 'object') {
    throw new Error('Invalid user data');
  }

  console.log('entrou aqui no trans', order);
  return {
    _id: order._id,
    status: order.status,
    userName: order.userName,
    deliveryDate: order.deliveryDate,
    address: order.address,
    price: order.price,
    plano: order.plano,
    phone: order.phone,
    email: order.email,
    driver: order.driver,
  };
};
