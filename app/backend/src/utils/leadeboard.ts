import { ILeaderboard } from '../Interfaces/LeaderBoards/ILeaderboard';
import { IMatch } from '../Interfaces/Matches/IMatch';

const leaderboard: { [key: string]: ILeaderboard } = {};

function calculateTotalPoints(victories: number, draws: number) {
  return (victories * 3) + draws;
}

function sortLeaderboardItens(el: ILeaderboard[]): ILeaderboard[] {
  const sortedItens = el.map((teamEl) => ({
    name: teamEl.name,
    totalPoints: teamEl.totalPoints,
    totalGames: teamEl.totalGames,
    totalVictories: teamEl.totalVictories,
    totalDraws: teamEl.totalDraws,
    totalLosses: teamEl.totalLosses,
    goalsFavor: teamEl.goalsFavor,
    goalsOwn: teamEl.goalsOwn,
  }));
  return sortedItens;
}

function verifyHomeTeamName(teamName: string, matchEl: IMatch): void {
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

function verifyAwayTeamName(teamName: string, matchEl: IMatch): void {
  const isTeam = leaderboard[teamName];
  if (!isTeam) {
    leaderboard[teamName] = {
      name: teamName,
      totalGames: 1,
      goalsFavor: matchEl.awayTeamGoals,
      totalVictories: matchEl.awayTeamGoals > matchEl.homeTeamGoals ? 1 : 0,
      totalDraws: matchEl.awayTeamGoals === matchEl.homeTeamGoals ? 1 : 0,
      totalLosses: matchEl.awayTeamGoals < matchEl.homeTeamGoals ? 1 : 0,
      goalsOwn: matchEl.homeTeamGoals,
    };
  }
}

export function leaderboardHomeCalc(matchesArray: IMatch[]) {
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
    } else verifyHomeTeamName(teamName, matchEl);
  });
  const leaderboardArray: ILeaderboard[] = Object.values(leaderboard);
  return sortLeaderboardItens(leaderboardArray);
}

export function leaderboardAwayCalc(matchesArray: IMatch[]) {
  matchesArray.forEach((matchEl: IMatch) => {
    const teamName = matchEl.awayTeam?.teamName || 'Unknown';
    if (leaderboard[teamName]) {
      leaderboard[teamName].totalGames += 1;
      leaderboard[teamName].goalsFavor += matchEl.awayTeamGoals;
      leaderboard[teamName].totalVictories += matchEl.awayTeamGoals > matchEl.homeTeamGoals ? 1 : 0;
      leaderboard[teamName].totalDraws += matchEl.awayTeamGoals === matchEl.homeTeamGoals ? 1 : 0;
      leaderboard[teamName].totalLosses += matchEl.awayTeamGoals < matchEl.homeTeamGoals ? 1 : 0;
      leaderboard[teamName].goalsOwn += matchEl.homeTeamGoals;
      leaderboard[teamName]
        .totalPoints = calculateTotalPoints(leaderboard[teamName]
          .totalVictories, leaderboard[teamName].totalDraws);
    } else verifyAwayTeamName(teamName, matchEl);
  });
  const leaderboardArray: ILeaderboard[] = Object.values(leaderboard);
  return sortLeaderboardItens(leaderboardArray);
}
