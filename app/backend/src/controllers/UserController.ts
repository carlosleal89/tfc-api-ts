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
}
