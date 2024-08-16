import { User } from '../models/userModel';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';

class AuthController {
  async signUp(req: Request, res: Response) {
    const user = req.body;
    try {
      const userCreated = await userService.add(user);
      if (!userCreated) {
        return res.status(409).json({ error: 'O cadastro já existe' });
      }
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Erro ao registrar usuário', error: err });
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      console.log(await bcrypt.compare(password, user.password));

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ msg: 'Invalid credentials' });
      }

      if (process.env.JWT_SECRET === undefined) {
        return res
          .status(500)
          .json({ msg: 'Variável de ambiente Secret não definida' });
      }

      const token = jwt.sign(
        {
          userName: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
      );

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao fazer login', error: err });
    }
  }
}

export default new AuthController();
