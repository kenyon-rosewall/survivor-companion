import { ITribalCouncil } from './tribalCouncil.model'
import { IPlayerInEpisode } from './player.model'

export enum VoteCategoryEnum {
  Vote = 'vote',
  ShotInTheDark = 'shotInTheDark',
  ExtraVote = 'extraVote',
  Revote = 'revote'
}

export interface IVote {
  id: number
  tribalCouncil?: ITribalCouncil
  tribalCouncilId: number
  voter?: IPlayerInEpisode
  voterId: number
  votedFor?: IPlayerInEpisode
  votedForId: number
  doesNotCount: boolean
  didNotVote: boolean
  category: VoteCategoryEnum
}
