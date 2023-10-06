import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { IMatchModel } from '../../Interfaces/Matches/IMatchModel';
import { ILeaderboard } from '../../Interfaces/LeaderBoards/ILeaderboard';
import MatchModel from '../../models/MatchModel';
import { leaderboardHomeCalc, leaderboardAwayCalc } from '../../utils/leadeboard';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async leaderBoards(teamType: string): Promise<ServiceResponse<ILeaderboard[]>> {
    const allFinishedMatches = await this.matchModel.getMatchesByStatus(false);
    let leaderboard: ILeaderboard[];
    if (teamType === 'home') {
      leaderboard = leaderboardHomeCalc(allFinishedMatches);
      return { status: 'SUCCESSFUL', data: leaderboard };
    }
    leaderboard = leaderboardAwayCalc(allFinishedMatches);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
