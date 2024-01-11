import { ISeason } from './season.model'
import { IPlayerInEpisode } from './player.model'

export interface IAlliance {
  id: number
  season?: ISeason
  seasonId: number
  alliancePlayers?: IPlayerInEpisode[]
  name: string
  color: string
  notes?: string
}
