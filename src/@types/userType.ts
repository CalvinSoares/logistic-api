import { Request } from 'express';

export type TypeUserToken = {
  _id: number;
  username: string;
  email: string;
  role: string;
};

export type TypeUser = {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'driver' | 'customer';
};

export type TypeRequestUser = Request & { user: TypeUserToken };
