import { ITeams } from './ITeams';

export interface ITeamModel {
  // create(data: Partial<ITeams>): Promise<ITeams>
  findAll(): Promise<ITeams[]>
}