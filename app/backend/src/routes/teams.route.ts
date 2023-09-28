import { Request, Router, Response } from 'express';

const router = Router();

router.get('/teams', (req: Request, res: Response) => console.log(req, res));

export default router;
