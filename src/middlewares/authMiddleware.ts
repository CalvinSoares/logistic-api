import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TypeRequestUser, TypeUserToken } from '../@types/userType';

export const authenticateJWT = (
  req: TypeRequestUser,
  res: Response,
  next: NextFunction,
) => {
  const headerToken = req.headers.authorization;
  console.log('entou aqui');
  if (!headerToken) {
    return res.status(401).send({ error: 'Token não informado' });
  }
  const [typeToken, token] = headerToken.split(' ');
  console.log('token da req', token);
  if (token == 'null') {
    return res.status(401).send({ error: 'Token é null' });
  }

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
