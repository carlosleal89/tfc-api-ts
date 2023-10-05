import { ILeaderboard } from '../Interfaces/LeaderBoards/ILeaderboard';
import { IMatch } from '../Interfaces/Matches/IMatch';

const leaderboard: { [key: string]: ILeaderboard } = {};

function verifyTeamName(teamName: string, matchEl: IMatch): void {
  const isTeam = leaderboard[teamName];
  if (!isTeam) {
    leaderboard[teamName] = {
      name: teamName,
      totalGames: 1,
      goalsFavor: matchEl.homeTeamGoals,
      totalVictories: matchEl.homeTeamGoals > matchEl.awayTeamGoals ? 1 : 0,
      totalDraws: matchEl.homeTeamGoals === matchEl.awayTeamGoals ? 1 : 0,
      totalLosses: matchEl.homeTeamGoals < matchEl.awayTeamGoals ? 1 : 0,
      goalsOwn: matchEl.awayTeamGoals,
    };
  }
}

function calculateTotalPoints(victories: number, draws: number) {
  return (victories * 3) + draws;
}

export default function leaderboardCalc(matchesArray: IMatch[]) {
  matchesArray.forEach((matchEl: IMatch) => {
    const teamName = matchEl.homeTeam?.teamName || 'Unknown';
    if (leaderboard[teamName]) {
      leaderboard[teamName].totalGames += 1;
      leaderboard[teamName].goalsFavor += matchEl.homeTeamGoals;
      leaderboard[teamName].totalVictories += matchEl.homeTeamGoals > matchEl.awayTeamGoals ? 1 : 0;
      leaderboard[teamName].totalDraws += matchEl.homeTeamGoals === matchEl.awayTeamGoals ? 1 : 0;
      leaderboard[teamName].totalLosses += matchEl.homeTeamGoals < matchEl.awayTeamGoals ? 1 : 0;
      leaderboard[teamName].goalsOwn += matchEl.awayTeamGoals;
      leaderboard[teamName]
        .totalPoints = calculateTotalPoints(leaderboard[teamName]
          .totalVictories, leaderboard[teamName].totalDraws);
    } else verifyTeamName(teamName, matchEl);
  });
  const leaderboardArray: ILeaderboard[] = Object.values(leaderboard);
  return leaderboardArray;
}
