import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUsers } from '../Interfaces/Users/IUsers';
import { IUserModel } from '../Interfaces/Users/IUsersModel';

export default class UsersModel implements IUserModel {
  private model = SequelizeUsers;

  async findByEmail(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;

    return user.toJSON();
  }
}
