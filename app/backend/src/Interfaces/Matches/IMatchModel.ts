import { IMatch } from './IMatch';

export interface IMatchModel {
  getAllMatches(): Promise<IMatch[]>;
  getMatchesByStatus(value: boolean | string): Promise<IMatch[]>;
}
