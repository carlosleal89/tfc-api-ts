import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderBoardController();

router.get('/:teamType', (req: Request, res: Response) => leaderboardController
  .leaderBoards(req, res));

// router.get('/away', (req: Request, res: Response) => leaderboardController.leaderBoards(req, res));

export default router;
