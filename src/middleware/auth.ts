import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const SECRET_KEY = config.secretKey;

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
