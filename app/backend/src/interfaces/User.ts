export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUser extends IUserCredentials {
  username: string;
}

export interface IUserDTO {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: string;
}
