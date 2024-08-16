import { Request, Response, NextFunction } from 'express';
import { TypeRequestUser } from '../@types/userType';

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: TypeRequestUser, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
  };
};
