import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { TypeRequestUser } from '../@types/userType';
dotenv.config();

class UserController {
  async GetAll(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Erro Get Users', error: (err as Error).message });
    }
  }
}

export default new UserController();
