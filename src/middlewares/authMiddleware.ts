import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(401).send({ error: 'Token não informado' });
  }
  const [typeToken, token] = headerToken.split(' ');

  if (process.env.JWT_SECRET === undefined) {
    return res
      .status(500)
      .json({ msg: 'Variável de ambiente Secret não definida' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Token Inválido', error: err });
    }
    req.user = decoded;
    next();
  });
};
