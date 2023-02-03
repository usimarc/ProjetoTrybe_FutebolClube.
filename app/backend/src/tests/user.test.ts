import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import JwtConfig from '..//autorization/jwtConfig';
import UserModel from '../database/models/User';
import  userMock  from './mock/user.mock';

// Esse projeto eu tive muita dificuldades e precisei de muita ajuda e explicação do Giovani
class mockUser {
  username: string | undefined;
  role: string | undefined;
  email: string | undefined;
  password: string | undefined;
}
export default mockUser;


chai.use(chaiHttp);

const { expect } = chai;

const login = {
  email: 'user@user.com',
  password: 'secret_user'
}

describe('Testa rota', () => {
  beforeEach(sinon.restore);

  it('Verifica o método POST na rota /login', async () => {
      sinon.stub(UserModel, "findOne").resolves(userMock as any);
      sinon.stub(bcrypt, "compareSync").returns(true);
      sinon.stub(JwtConfig.prototype, "createToken").returns("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NzQ1ODgwNzYsImV4cCI6MTY3NDYzMTI3Nn0.9HdJXxWZmGhRsyIpX5kcr2yDruGEoW5cADPHtkhVjNQ");

      const response = await chai.request(app).post('/login').send(login);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
  });

  
  
});