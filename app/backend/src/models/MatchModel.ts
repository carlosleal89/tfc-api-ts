import { IMatchModel, finishedMsg } from '../Interfaces/Matches/IMatchModel';
import { IMatch } from '../Interfaces/Matches/IMatch';
import SequelizeMatches from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatches;

  async getAllMatches(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async getMatchesByStatus(value: boolean): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: {
        inProgress: [value],
      },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async finishMatchById(id: number): Promise<finishedMsg> {
    await this.model.update({ inProgress: false }, {
      where: {
        id,
      },
    });
    return {
      message: 'Finished',
    };
  }

  async updateMatchById(id: number, goals: Record<string, number>): Promise<finishedMsg> {
    await this.model.update({
      homeTeamGoals: goals.homeTeamGoals,
      awayTeamGoals: goals.awayTeamGoals,
    }, {
      where: {
        id,
      },
    });
    return {
      message: 'Updated',
    };
  }
}
