import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET não está definido no arquivo .env');
}

//está ok
export const signUp = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'O usuário já existe' });
    }
    const hash = await bcrypt.hash(password, 10);
    const usuario = await User.create({
      username,
      email,
      password: hash,
      role,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error: err });
  }
};

//pendente
export const singIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);

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

    // Gerando o token JWT
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao fazer login', error: err });
  }
};
