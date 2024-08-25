import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IToken extends Document {
  email: string;
  refreshToken: string;
  token: string;
}

const tokenSchema = new Schema<IToken>({
  email: { type: String, required: true, unique: true },
  refreshToken: { type: String, required: true },
  token: { type: String, required: true },
});

export const TokenUsers = model<IToken>('Token', tokenSchema);
