import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const router = Router();

const userController = new UserController();

router.post('/', Validations.validateLogin, (req: Request, res: Response) =>
  userController.login(req, res));

router.get('/role', Validations.validateToken, (req: Request, res: Response) =>
  userController.getRole(req, res));

export default router;
