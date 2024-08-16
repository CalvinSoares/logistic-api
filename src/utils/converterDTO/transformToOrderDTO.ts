import { TypeOrder } from '../../@types/orderType';
import { OrderDTO } from '../../dto/orderDto';

export const transformToOrderDTO = (user: TypeOrder | null): OrderDTO => {
  if (!user || typeof user !== 'object') {
    throw new Error('Invalid user data');
  }
  return {
    _id: user._id.toString(),
    status: user.status,
    userName: user.userName,
    deliveryDate: user.deliveryDate,
    address: user.address,
    price: user.price,
    plano: user.plano,
    phone: user.phone,
    email: user.email,
  };
};
