import { ILeaderBoard, ITeamMatch } from '../../interfaces';

export const obj = (): ILeaderBoard => {
  const object = {
    name: 'xablau',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  return object;
};

const teamData = (array: number[], match: ITeamMatch, factor: number) => {
  const result: number = (match.homeTeamGoals - match.awayTeamGoals) * factor;
  const favorGoals: number = factor === 1 ? match.homeTeamGoals : match.awayTeamGoals;
  const ownGoals: number = factor === 1 ? match.awayTeamGoals : match.homeTeamGoals;
  const arr = [
    result > 0 ? array[0] + 1 : array[0],
    result === 0 ? array[1] + 1 : array[1],
    result < 0 ? array[2] + 1 : array[2],
    array[3] + favorGoals,
    array[4] + ownGoals,
  ];

  return arr;
};

const teamStats = (arr: number[], tN: string | undefined, pts: number, tG: number) => {
  const object = {
    name: tN,
    totalPoints: pts,
    totalGames: tG,
    totalVictories: arr[0],
    totalDraws: arr[1],
    totalLosses: arr[2],
    goalsFavor: arr[3],
    goalsOwn: arr[4],
    goalsBalance: arr[3] - arr[4],
    efficiency: ((pts / (tG * 3)) * 100).toFixed(2),
  };

  return object;
};

const leaderBoard = (teamsMatches: ITeamMatch[][], place: string) => {
  const lderBoard: ILeaderBoard[] = [];
  const factor: number = place === 'homeTeam' ? 1 : -1;
  teamsMatches.forEach((teamMatch: ITeamMatch[]) => {
    const teamName: string | undefined = teamMatch[0].homeTeam
      ? teamMatch[0].homeTeam.teamName
      : teamMatch[0].awayTeam && teamMatch[0].awayTeam.teamName;
    const totalGames: number = teamMatch.length;
    let array: number[] = [0, 0, 0, 0, 0];
    let tStats: ILeaderBoard = obj();

    teamMatch.forEach((match: ITeamMatch) => {
      array = teamData(array, match, factor);
      const pts = array[0] * 3 + array[1];
      tStats = teamStats(array, teamName, pts, totalGames);
    });

    lderBoard.push(tStats);
  });
  return lderBoard;
};

export const sortBoard = (lBSorted: ILeaderBoard[]) => {
  const boardSorted = lBSorted.sort((a: ILeaderBoard, b: ILeaderBoard) => {
    const bAPoints = a.totalPoints > b.totalPoints;
    const aAPoints = a.totalPoints === b.totalPoints;
    const bABalance = a.goalsBalance > b.goalsBalance;
    const aABalance = a.goalsBalance === b.goalsBalance;
    const bAGoals = a.goalsFavor > b.goalsFavor;
    if (bAPoints) return -1;
    if (aAPoints && bABalance) return -1;
    if (aAPoints && aABalance && bAGoals) return -1;
    return 1;
  });

  return boardSorted;
};

const generalData = (array: number[], match: ILeaderBoard) => {
  const arr = [
    array[0] + match.totalPoints,
    array[1] + match.totalGames,
    array[2] + match.totalVictories,
    array[3] + match.totalDraws,
    array[4] + match.totalLosses,
    array[5] + match.goalsFavor,
    array[6] + match.goalsOwn,
    array[7] + match.goalsBalance,
  ];

  return arr;
};

const generalStats = (arr: number[], name: string | undefined) => {
  const object = {
    name,
    totalPoints: arr[0],
    totalGames: arr[1],
    totalVictories: arr[2],
    totalDraws: arr[3],
    totalLosses: arr[4],
    goalsFavor: arr[5],
    goalsOwn: arr[6],
    goalsBalance: arr[7],
    efficiency: ((arr[0] / (arr[1] * 3)) * 100).toFixed(2),
  };

  return object;
};

export const generalLeaderBoard = (teamsMatches: ILeaderBoard[][]) => {
  const lderBoard: ILeaderBoard[] = [];
  teamsMatches.forEach((teamMatch: ILeaderBoard[]) => {
    let array: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    let tStats: ILeaderBoard = obj();

    teamMatch.forEach((match: ILeaderBoard) => {
      array = generalData(array, match);
      tStats = generalStats(array, match.name);
    });

    lderBoard.push(tStats);
  });
  return lderBoard;
};

export default leaderBoard;
