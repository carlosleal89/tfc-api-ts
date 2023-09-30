import { Router } from 'express';
import teamsRouter from './teams.route';
import usersRouter from './user.route';

const router = Router();

router.use('/teams', teamsRouter);

router.use('/login', usersRouter);

export default router;
