import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { IMatchModel, finishedMsg } from '../../Interfaces/Matches/IMatchModel';
import { IMatch } from '../../Interfaces/Matches/IMatch';
import MatchModel from '../../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.getAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByStatus(value: boolean): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.getMatchesByStatus(value);
    if (!allMatches) {
      return { status: 'NOT_FOUND', data: { message: 'No matches found' } };
    }
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatchById(id: number): Promise<finishedMsg> {
    await this.matchModel.finishMatchById(id);
    // console.log('SERVICE', finishedMatch);
    return {
      message: 'Finished',
    };
  }
}
