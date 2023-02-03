import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { ILeaderBoard, InMatch, ITeam, ITeamMatch } from '../interfaces';
import leaderBoard, { generalLeaderBoard, sortBoard } from './utils/leader.utils';

export default class LeaderService {
  public mModel;
  public tModel;

  constructor() {
    this.mModel = Matches;
    this.tModel = Teams;
  }

  public getAllTeams = async () => {
    const teams = await this.tModel.findAll();
    return teams;
  };

  public getAllMatches = async (place: string): Promise<InMatch[]> => {
    const matches = await this.mModel.findAll({
      include: { model: Teams, as: `${place}`, attributes: ['teamName'] },
      where: { inProgress: false },
    });

    return matches;
  };

  public leaderBoard = async (teams: ITeam[], matches: InMatch[], place: string) => {
    const teamsMatches: ITeamMatch[][] = [];
    teams.forEach((team) => {
      const teamMatches: ITeamMatch[] = this.getTeamMatches(matches, team, place);
      teamsMatches.push(teamMatches);
    });

    const leaderBoardSorted: ILeaderBoard[] = leaderBoard(teamsMatches, place);
    const sort = sortBoard(leaderBoardSorted);
    return sort;
  };

  public getTeamMatches = (matches: InMatch[], team: ITeam, place: string) => {
    const teamMatch: InMatch[] = place === 'homeTeam' ? matches
      .filter((match) => match.homeTeamId === team.id)
      : matches
        .filter((match) => match.awayTeamId === team.id);

    return teamMatch;
  };

  public generalBoard = (teams: ITeam[], leaderH: ILeaderBoard[], leaderA: ILeaderBoard[]) => {
    const spreadBoard: ILeaderBoard[] = [...leaderH, ...leaderA];
    const teamsMatches: ILeaderBoard[][] = [];
    teams.forEach((team) => {
      const teamMatches: ILeaderBoard[] = spreadBoard
        .filter((match) => match.name === team.teamName);
      teamsMatches.push(teamMatches);
    });
    console.log('teamsMatches', teamsMatches);
    const leaderBoardSorted: ILeaderBoard[] = generalLeaderBoard(teamsMatches);
    const sort = sortBoard(leaderBoardSorted);
    return sort;
  };
}
