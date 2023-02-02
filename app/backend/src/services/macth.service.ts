import Match from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { InMatch } from '../interfaces/Matches';

export default class MatchService {
  public model;

  constructor() {
    this.model = Match;
  }

  public getAllMatches = async () => {
    const match = await this.model.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
    });

    return match;
  };

  public getMatches = async (inProgress: boolean) => {
    const match = await this.model.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
      where: { inProgress },
    });

    return match;
  };

  public getMatchById = async (id: number): Promise<InMatch | null> => {
    const match = await this.model.findByPk(id);
    return match;
  };

  public getByTeams = async (
    { homeTeamId, awayTeamId }: InMatch,
  ) => {
    const match = await this.model.findAll(
      { where: { homeTeamId, awayTeamId } },
    );

    return match;
  };

  public createMatch = async (data: InMatch) => {
    const match = await this.model.create({ ...data });
    return match;
  };

  public finishMatch = async (id: string) => {
    await this.model.update({ inProgress: false }, { where: { id } });
  };

  public updateScore = async (id: string, { homeTeamGoals, awayTeamGoals }: InMatch) => {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}
