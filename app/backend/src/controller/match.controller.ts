import { Request, Response } from 'express';
import { InMatch } from '../interfaces/Matches';
import MatchService from '../services/macth.service';
import TeamService from '../services/team.service';

export default class MatchController {
  public service;
  public tService;

  constructor() {
    this.service = new MatchService();
    this.tService = new TeamService();
  }

  public getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    let matches: InMatch[] = [];

    if (!inProgress) {
      matches = await this.service.getAllMatches();
      return res.status(200).json(matches);
    }

    const progress = inProgress === 'true';
    matches = await this.service.getMatches(progress);

    return res.status(200).json(matches);
  };

  public createMatch = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const data: InMatch = { homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true };

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const homeTeam = await this.tService.getTeam(homeTeamId);
    const awayTeam = await this.tService.getTeam(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const matchCreated = await this.service.createMatch(data);

    return res.status(201).json(matchCreated);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.service.finishMatch(id);

    return res.status(200).json({ message: 'Finished' });
  };

  public updateScore = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.service.updateScore(id, req.body);

    return res.status(200).json({ message: 'Score updated' });
  };
}
