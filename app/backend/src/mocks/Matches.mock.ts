const match = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: 'São Paulo',
  },
  awayTeam: {
    teamName: 'Grêmio',
  },
};

const matchInProgress = {
  id: 41,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: 'São Paulo',
  },
  awayTeam: {
    teamName: 'Internacional',
  },
};

const matchFinished = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: 'São Paulo',
  },
  awayTeam: {
    teamName: 'Grêmio',
  },
};

const matchesFinished = [matchFinished];

const matchesInProgress = [matchInProgress];

const matches = [match];

export { match, matches, matchInProgress, matchesInProgress, matchFinished, matchesFinished };
