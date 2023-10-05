import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { IMatchModel } from '../../Interfaces/Matches/IMatchModel';
import { ILeaderboard } from '../../Interfaces/LeaderBoards/ILeaderboard';
import MatchModel from '../../models/MatchModel';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async leaderBoards(): Promise<ServiceResponse<ILeaderboard[] | number[]>> {
    const allFinishedMatches = await this.matchModel.getMatchesByStatus(false);
    console.log(allFinishedMatches);
    const teamsClassification = allFinishedMatches.map((matchEl) => matchEl.homeTeamId);
    return { status: 'SUCCESSFUL', data: teamsClassification };
  }
}
