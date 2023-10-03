import { IMatch } from './IMatch';

export type finishedMsg = {
  message: 'Finished' | 'Updated',
};

export interface IMatchModel {
  getAllMatches(): Promise<IMatch[]>;
  getMatchesByStatus(value: boolean | string): Promise<IMatch[]>;
  finishMatchById(id: number): Promise<finishedMsg | IMatch>;
  updateMatchById(id: number, goals: Record<string, number>): Promise<finishedMsg>;
  createMatch(match: Record<string, number>): Promise<IMatch>;
}
