import { Request, Response } from 'express';
import { InMatch } from '../interfaces';
import LeaderService from '../services/leader.servide';

export default class LeaderController {
  public service;

  constructor() {
    this.service = new LeaderService();
  }

  public leaderAtHome = async (_req: Request, res: Response) => {
    const place = 'homeTeam';
    const teams = await this.service.getAllTeams();
    const matches: InMatch[] = await this.service.getAllMatches(place);
    const leaderBoard = await this.service.leaderBoard(teams, matches, place);
    return res.status(200).json(leaderBoard);
  };

  public leaderAway = async (_req: Request, res: Response) => {
    const place = 'awayTeam';
    const teams = await this.service.getAllTeams();
    const matches: InMatch[] = await this.service.getAllMatches(place);
    const leaderBoard = await this.service.leaderBoard(teams, matches, place);
    return res.status(200).json(leaderBoard);
  };

  public leaderBoard = async (_req: Request, res: Response) => {
    const teams = await this.service.getAllTeams();

    const matchesHome: InMatch[] = await this.service.getAllMatches('homeTeam');
    const leaderHome = await this.service.leaderBoard(teams, matchesHome, 'homeTeam');

    const matchesAway: InMatch[] = await this.service.getAllMatches('awayTeam');
    const leaderAway = await this.service.leaderBoard(teams, matchesAway, 'awayTeam');

    const gnlBoard = this.service.generalBoard(teams, leaderHome, leaderAway);

    return res.status(200).json(gnlBoard);
  };
}
