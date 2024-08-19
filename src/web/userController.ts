import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { TypeRequestUser, TypeUser } from '../@types/userType';
import { transformToUserDTO } from '../utils/converterDTO/transformToUserDTO';
import { UserDTO } from '../dto/userDto';
import userService from '../services/userService';
import orderService from '../services/orderService';
dotenv.config();

class UserController {
  async GetAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
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
      const userFind = await userService.findByEmail(email);

      if (!userFind) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(userFind);
    } catch (err) {
      res.status(500).json({
        message: 'Error Update user failed',
        error: (err as Error).message,
      });
    }
  }

  async FindOneById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userFind = await userService.findById(id);

      if (!userFind) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(userFind);
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
      const user = req.body;

      const userUpdate = await userService.updateById(id, user);

      if (!userUpdate) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.status(200).json(userUpdate);
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
      const userDeleted = await userService.deleteById(id);

      if (!userDeleted) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(userDeleted);
    } catch (err) {
      res.status(500).json({
        message: 'Error Delete failed',
        error: (err as Error).message,
      });
    }
  }
}

export default new UserController();
