import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  public service;

  constructor() {
    this.service = new TeamService();
  }

  public getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.service.getAllTeams();
    return res.status(200).json(teams);
  };

  public getTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teams = await this.service.getTeam(id);
    return res.status(200).json(teams);
  };
}
