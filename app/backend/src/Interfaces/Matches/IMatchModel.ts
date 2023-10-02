import { IMatch } from './IMatch';

export interface IMatchModel {
  getAllMatches(): Promise<IMatch[]>;
}
