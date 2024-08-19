export type OrderDTO = {
  _id: string;
  status: string;
  userName: string;
  deliveryDate: Date;
  address: string;
  price: number;
  plano: string;
  phone: string;
  email: string;
};

export type CreateOrderDTO = {
  status: string;
  userName: string;
  deliveryDate: Date;
  address: string;
  price: number;
  plano: string;
  phone: string;
  email: string;
};
