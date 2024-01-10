import { IPlayerInEpisode } from './player.model'

export enum EliminationCategoryEnum {
  VotedOut = 'votedOut',
  RockDraw = 'rockDraw',
  FireMaking = 'fireMaking',
  Quit = 'quit',
  Medevac = 'medevac',
  Redemption = 'redemption',
  Edge = 'edge',
  Ejection = 'ejection',
  RedemptionDuel = 'redemptionDuel',
  EdgeChallenge = 'edgeChallenge'
}

export interface IElimination {
  id: number
  order: number
  onDay: number
  playerInEpisode?: IPlayerInEpisode
  playerInEpisodeId: number
  category: EliminationCategoryEnum
  notes?: string
}
