import { IUsers } from './IUsers';

export type roleMsg = {
  role: string,
};

export interface IUserModel {
  findByEmail(email:string): Promise<IUsers | null>;
  getRole(email: string): Promise<roleMsg | null>;
}
