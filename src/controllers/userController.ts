import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { TypeRequestUser, TypeUser } from '../@types/userType';
import { transformToUserDTO } from '../utils/transformToUserDTO';
dotenv.config();

class UserController {
  async GetAll(req: Request, res: Response) {
    try {
      const users = (await User.find().lean()) as TypeUser[] | null;
      if (!users) {
        return res.status(404).json({ message: 'No users found' });
      }
      const usersDTO = users.map((u) => transformToUserDTO(u));

      res.status(200).json(usersDTO);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Erro Get Users', error: (err as Error).message });
    }
  }

  async FindOne(req: Request, res: Response) {}

  async UpdateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;

      const userUpdate = (await User.findOneAndUpdate(
        { _id: id },
        { $set: body },
        { new: true, lean: true, fields: { password: 0 } },
      )) as TypeUser | null;

      if (!userUpdate) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      console.log(userUpdate);

      const userDTO = transformToUserDTO(userUpdate);

      res.status(200).json(userDTO);
    } catch (error) {}
  }
}

export default new UserController();
