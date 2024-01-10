import { ISeason } from './season.model'
import { IPlayerInEpisode } from './player.model'
import { ITribalCouncil } from './tribalCouncil.model'

export interface IEpisode {
  id: number
  season?: ISeason
  seasonId: number
  order: number
  name?: string
  airingDate: Date
  days: number
  notes?: string
  premiere: boolean
  merge: boolean
  final: boolean
  playersInEpisode?: IPlayerInEpisode[]
  tribalCouncils?: ITribalCouncil[]
}
