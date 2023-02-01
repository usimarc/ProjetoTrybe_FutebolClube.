import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { JwtPayload, Secret } from 'jsonwebtoken';
import Jwt from '../autorization/jwtConfig';
import UserService from '../services/user.service';

const secret: Secret = process.env.JWT_SECRET || 'seuSegredoAqui';

export default class UserController {
  public service;
  public jwt;

  constructor() {
    this.service = new UserService();
    this.jwt = new Jwt(secret);
  }

  public getLogin = async (
    req: Request,
    res: Response,
  ) => {
    const { email, password } = req.body;
    const user = await this.service.getLogin(email);
    let token = '';

    if (user && bcrypt.compareSync(password, user.password)) {
      token = this.jwt.createToken(user.dataValues);
    }

    if (!token) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    return res.status(200).json({ token });
  };

  public getAccess = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) { return res.status(401).json({ message: 'Denied' }); }

    const payload: JwtPayload = this.jwt.verifyToken(authorization);
    const user = await this.service.getLogin(payload.email);

    return res.status(200).json({ role: user?.dataValues.role });
  };
}
