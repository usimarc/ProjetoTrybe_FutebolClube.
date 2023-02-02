import Teams from '../database/models/Teams';

export default class TeamService {
  public model;

  constructor() {
    this.model = Teams;
  }

  public getAllTeams = async () => {
    const teams = await this.model.findAll();

    return teams;
  };

  public getTeam = async (id: string) => {
    const team = await this.model.findByPk(id);

    return team;
  };
}
