import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const router = Router();

const userController = new UserController();

router.post('/', Validations.validateLogin, (req: Request, res: Response) =>
  userController.login(req, res));

export default router;
