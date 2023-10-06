import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusToHTTP';
import LeaderboardService from '../services/Leaderboards/LeaderboardService';

export default class LeaderBoardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async leaderBoards(req: Request, res: Response) {
    const { teamType } = req.params;
    const ServiceResponse = await this.leaderboardService.leaderBoards(teamType);
    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }
}
