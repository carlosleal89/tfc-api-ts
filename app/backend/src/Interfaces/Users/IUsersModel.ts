import { IUsers } from './IUsers';

export interface IUserModel {
  findByEmail(email:string): Promise<IUsers | null>;
}
