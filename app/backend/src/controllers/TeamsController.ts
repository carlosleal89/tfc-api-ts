import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusToHTTP';
import TeamsService from '../services/Teams/TeamService';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const ServiceResponse = await this.teamsService.getAllTeams();
    res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }
}
