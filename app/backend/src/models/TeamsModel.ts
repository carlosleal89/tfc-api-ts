import { ITeamModel } from '../Interfaces/Teams/ITeamsModel';
import { ITeams } from '../Interfaces/Teams/ITeams';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamsModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    console.log(dbData);
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }
}
