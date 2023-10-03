import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusToHTTP';
import UserService from '../services/Users/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const ServiceResponse = await this.userService.login(email, password);
    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }

  public async getRole(req: Request, res: Response) {
    const { user } = res.locals;
    const ServiceResponse = await this.userService.getRole(user.email);
    return res.status(mapStatusHTTP('SUCCESSFUL')).json(ServiceResponse.role);
  }
}
