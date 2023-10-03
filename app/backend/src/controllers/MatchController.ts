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
      const ServiceResponse = await this.matchService.getMatchesByStatus(inProgress === 'true');
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }
    const ServiceResponse = await this.matchService.getAllMatches();
    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }

  public async finishMatchById(req: Request, res: Response) {
    const { id } = req.params;
    // if (!id) {
    //   return res.status(mapStatusHTTP('NOT_FOUND')).json({ message: 'ID not found.' });
    // }
    const ServiceResponse = await this.matchService.finishMatchById(Number(id));
    return res.status(mapStatusHTTP('SUCCESSFUL')).json(ServiceResponse);
  }

  public async updateMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const ServiceResponse = await this.matchService
      .updateMatchById(Number(id), { homeTeamGoals, awayTeamGoals });
    return res.status(mapStatusHTTP('SUCCESSFUL')).json(ServiceResponse);
  }
}
