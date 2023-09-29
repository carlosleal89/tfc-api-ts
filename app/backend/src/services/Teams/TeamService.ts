import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { ITeamModel } from '../../Interfaces/Teams/ITeamsModel';
import TeamsModel from '../../models/TeamsModel';
import { ITeams } from '../../Interfaces/Teams/ITeams';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamModel = new TeamsModel(), // caso nenhum model seja passado ao instanciar essa classe, sera usado o model Teams.
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: ITeams['id']): Promise<ServiceResponse<ITeams | null>> {
    const teamEl = await this.teamsModel.findById(id);
    if (!teamEl) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return { status: 'SUCCESSFUL', data: teamEl };
  }
}
