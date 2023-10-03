import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusToHTTP';
import MatchService from '../services/Matches/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      console.log('controller', inProgress);
      const ServiceResponse = await this.matchService.getMatchesByStatus(inProgress === 'true');
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }
    const ServiceResponse = await this.matchService.getAllMatches();
    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }
}
