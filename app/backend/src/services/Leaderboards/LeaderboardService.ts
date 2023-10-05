import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { IMatchModel } from '../../Interfaces/Matches/IMatchModel';
import { ILeaderboard } from '../../Interfaces/LeaderBoards/ILeaderboard';
import MatchModel from '../../models/MatchModel';
import leaderboardCalc from '../../utils/leadeboard';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async leaderBoards(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allFinishedMatches = await this.matchModel.getMatchesByStatus(false);
    const leaderboard: ILeaderboard[] = leaderboardCalc(allFinishedMatches);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
