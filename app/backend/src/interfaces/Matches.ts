export interface ITeamMatch extends InMatch{
  homeTeam?: { teamName: string },
  awayTeam?: { teamName: string },
}

export interface InMatch {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface ITeam {
  id?: number;
  teamName: string;
}
