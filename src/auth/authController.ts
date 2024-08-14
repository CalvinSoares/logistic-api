import { User } from '../models/userModel';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
  async signUp(req: Request, res: Response) {
    const { userName, password, role } = req.body;
    try {
      await User.findOne({ userName: userName }).then((response: any) => {
        if (response) {
          return res.status(409).json({ error: 'O usuário já existe' });
        } else {
          bcrypt.hash(
            password,
            10,
            async (err: Error | undefined, hash: string) => {
              const usuario = {
                userName,
                password: hash,
                role,
              };
              await User.create(usuario).then((response) => {
                if (!response) {
                  return res
                    .status(400)
                    .json({ msg: 'Erro ao registrar  Usuario' });
                } else {
                  res
                    .status(201)
                    .json({ msg: 'Usuário registrado com sucesso' });
                }
              });
            },
          );
        }
      });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: 'Erro ao cadastrar Usuario', err: error });
    }
  }

  async signIn(req: Request & { userData?: any }, res: Response) {
    const { userName, password } = req.body;
    console.log(req.body);
    try {
      const response: any | null = await User.findOne({
        userName: userName,
      });

      if (!response) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const isPasswordValid = await bcrypt.compare(password, response.password);

      if (!isPasswordValid) {
        return res.status(401).json({ msg: 'Credenciais inválidas' });
      }

      if (process.env.SECRET === undefined) {
        return res
          .status(500)
          .json({ msg: 'Variável de ambiente Secret não definida' });
      }

      const token = jwt.sign(
        {
          userId: response._id,
          userName: response.userName,
          role: response.role,
        },
        process.env.SECRET,
      );

      return res.status(201).json({
        user: response.userName,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ msg: 'Erro interno do servidor', err: error });
    }
  }
}

export default new AuthController();
