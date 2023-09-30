import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
// import { IUsers } from '../../Interfaces/Users/IUsers';
import UsersModel from '../../models/UsersModel';
import { IUserModel } from '../../Interfaces/Users/IUsersModel';
import envArgs from '../../utils/envArgs';

export default class UserService {
  constructor(
    private usersModel: IUserModel = new UsersModel(), // caso nenhum model seja passado ao instanciar essa classe, sera usado o model Teams.
  ) { }

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.usersModel.findByEmail(email);
    console.log('service', user);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
    }, envArgs.jwtSecret, {
      expiresIn: '7d',
    });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
