import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { TypeRequestUser, TypeUser } from '../@types/userType';
import { transformToUserDTO } from '../utils/converterDTO/transformToUserDTO';
import { UserDTO } from '../dto/userDto';
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

  async FindOneByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const userFind = (await User.findOne(
        { email: email },
        {},
        { lean: true },
      )) as TypeUser | null;

      if (!userFind) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userDTO = transformToUserDTO(userFind);

      res.status(200).json(userDTO);
    } catch (err) {
      res.status(500).json({
        message: 'Error Update user failed',
        error: (err as Error).message,
      });
    }
  }

  async DeleteOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userDeleted = (await User.findOneAndDelete(
        { _id: id },
        { new: true, lean: true },
      )) as TypeUser | null;

      if (!userDeleted) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userDTO = transformToUserDTO(userDeleted);

      res.status(200).json(userDTO);
    } catch (err) {
      res.status(500).json({
        message: 'Error Delete failed',
        error: (err as Error).message,
      });
    }
  }

  async FindOneById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userFind = (await User.findOne(
        { _id: id },
        {},
        { lean: true },
      )) as TypeUser | null;

      if (!userFind) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userDTO = transformToUserDTO(userFind);

      res.status(200).json(userDTO);
    } catch (err) {
      res.status(500).json({
        message: 'Error Update user failed',
        error: (err as Error).message,
      });
    }
  }

  async UpdateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;

      const userUpdate = (await User.findOneAndUpdate(
        { _id: id },
        { $set: body },
        { new: true, lean: true },
      )) as TypeUser | null;

      if (!userUpdate) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const userDTO = transformToUserDTO(userUpdate);

      res.status(200).json(userDTO);
    } catch (err) {
      res.status(500).json({
        message: 'Error Update user failed',
        error: (err as Error).message,
      });
    }
  }
}

export default new UserController();