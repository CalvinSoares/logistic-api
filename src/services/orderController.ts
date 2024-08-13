import { IOrder, Order } from "../models/orderModel";

export const getAllOrders = async (): Promise<IOrder[]> => {
  return Order.find();
};

export const getOrder = async (id: string): Promise<IOrder | null> => {
  return Order.findById(id);
};

export const createNewOrder = async (orderData: IOrder): Promise<IOrder> => {
  const order = new Order(orderData);
  return order.save();
};

export const updateOrderById = async (
  id: string,
  orderData: Partial<IOrder>
): Promise<IOrder | null> => {
  return Order.findByIdAndUpdate(id, orderData, { new: true });
};

export const deleteOrderById = async (id: string): Promise<IOrder | null> => {
  return Order.findByIdAndDelete(id);
};
