import { IPlayerInEpisode } from './player.model'

export enum AdvantageEventCategoryEnum {
  Obtained = 'obtained',
  Played = 'played',
  Transferred = 'transferred',
  Lost = 'lost',
  Expired = 'expired'
}

export interface IAdvantage {
  id: number
  name: string
  description: string
  playersInEpisodes?: IPlayerInEpisode[]
  plays?: IAdvantageEvent[]
}

export interface IAdvantageEvent {
  id: number
  playerInEpisode?: IPlayerInEpisode
  playerInEpisodeId: number
  advantage?: IAdvantage
  advantageId: number
  category: AdvantageEventCategoryEnum
  notes?: string
}
