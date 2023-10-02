import { Router } from 'express';
import teamsRouter from './teams.route';
import usersRouter from './user.route';
import matchRouter from './match.route';

const router = Router();

router.use('/teams', teamsRouter);

router.use('/login', usersRouter);

router.use('/matches', matchRouter);

export default router;
