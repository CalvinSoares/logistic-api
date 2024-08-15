import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TypeUserToken } from '../@types/userType';

export const authenticateJWT = (
  req: Request & { user?: TypeUserToken },
  res: Response,
  next: NextFunction,
) => {
  const headerToken = req.headers.authorization;
  console.log('entou aqui');
  if (!headerToken) {
    return res.status(401).send({ error: 'Token não informado' });
  }
  console.log('entou aqui2');
  const [typeToken, token] = headerToken.split(' ');

  if (process.env.JWT_SECRET === undefined) {
    return res
      .status(500)
      .json({ msg: 'Variável de ambiente Secret não definida' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ msg: 'Token Inválido' });
  }

  console.log(decoded);

  req.user = decoded as TypeUserToken;
  next();
};
