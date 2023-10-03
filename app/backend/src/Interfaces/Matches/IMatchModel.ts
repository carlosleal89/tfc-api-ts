import { IMatch } from './IMatch';

export type finishedMsg = {
  message: 'Finished',
};

export interface IMatchModel {
  getAllMatches(): Promise<IMatch[]>;
  getMatchesByStatus(value: boolean | string): Promise<IMatch[]>;
  finishMatchById(id: number): Promise<finishedMsg | IMatch>;
}
