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

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const ServiceResponse = await this.teamsService.getTeamById(Number(id));

    if (ServiceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }

    return res.status(200).json(ServiceResponse.data);
  }
}
