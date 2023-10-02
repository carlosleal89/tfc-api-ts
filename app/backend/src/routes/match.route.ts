import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchController = new MatchController();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

export default router;
