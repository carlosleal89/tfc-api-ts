import { Router } from 'express';
import teamsRouter from './teams.route';
import usersRouter from './user.route';
import matchRouter from './match.route';
import leaderboardRouter from './leaderboard.route';

const router = Router();

router.use('/teams', teamsRouter);

router.use('/login', usersRouter);

router.use('/matches', matchRouter);

router.use('/leaderboard', leaderboardRouter);

export default router;
