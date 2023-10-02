import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusToHTTP';
import MatchService from '../services/Matches/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const ServiceResponse = await this.matchService.getAllMatches();
    res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }
}
