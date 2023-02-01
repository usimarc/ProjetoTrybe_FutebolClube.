import Users from '../database/models/User';

export default class UserService {
  public model;

  constructor() {
    this.model = Users;
  }

  public getLogin = async (email: string) => {
    const emailExists = await this.model.findOne({ where: { email } });
    return emailExists;
  };
}
