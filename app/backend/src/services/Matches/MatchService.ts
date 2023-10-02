import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { IMatchModel } from '../../Interfaces/Matches/IMatchModel';
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
}
