import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/userInterfaces';

class JwtConfig {
  public secret;

  constructor(secret: jwt.Secret) {
    this.secret = secret;
  }

  public createToken(user:IUser) {
    const { password: _, ...restUser } = user;
    const token = jwt.sign(restUser, this.secret, { algorithm: 'HS256', expiresIn: '15d' });
    if (!token) {
      console.log('Error');
    }
    return token;
  }

  public verifyToken(token: string) {
    const payload = jwt.verify(token, this.secret);

    return payload as jwt.JwtPayload;
  }
}

export default JwtConfig;
