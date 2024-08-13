import { Document, model, Schema } from "mongoose";

export interface IOrder extends Document {
  orderId?: string;
  packageId?: string;
  status: string;
  userName: string;
  deliveryDate?: Date;
  address: string;
  price: number;
  plano: string;
  phone: string;
  email: string;
}

const orderSchema = new Schema<IOrder>({
  orderId: { type: String },
  packageId: { type: String },
  status: { type: String, required: true },
  userName: { type: String, required: true },
  deliveryDate: { type: Date },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  plano: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

export const Order = model<IOrder>("Order", orderSchema);
