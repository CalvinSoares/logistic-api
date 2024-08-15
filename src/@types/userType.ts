import { Request } from 'express';

export type TypeUserToken = {
  _id: number;
  username: string;
  email: string;
  role: string;
};

export type TypeRequestUser = Request & { user: TypeUserToken };
