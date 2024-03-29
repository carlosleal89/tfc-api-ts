import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const router = Router();

const matchController = new MatchController();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.patch('/:id/finish', Validations.validateToken, (req: Request, res: Response) =>
  matchController.finishMatchById(req, res));

router.patch('/:id', Validations.validateToken, (req: Request, res: Response) =>
  matchController.updateMatchById(req, res));

router
  .post('/', Validations.validateToken, Validations.validateMatch, (req: Request, res: Response) =>
    matchController.createMatch(req, res));

export default router;
