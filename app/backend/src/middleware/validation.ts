import * as dotenv from 'dotenv';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const secret: string = process.env.JWT_SECRET || 'seuSegredoAqui';

export const validateUser: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  return next();
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) { return res.status(401).json({ message: 'Token must be a valid token' }); }

  try {
    const payload = jwt.verify(token, secret);
    req.body.decoded = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
