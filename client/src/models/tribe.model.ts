import { ISeason } from './season.model'
import { IPlayerInEpisode } from './player.model'
import { ITribalCouncil } from './tribalCouncil.model'

export interface ITribe {
  id: number
  name: string
  category?: string
  color?: string
  season?: ISeason
  seasonId?: number
  playersInEpisode?: IPlayerInEpisode[]
  tribalCouncils?: ITribalCouncil[]
}

export interface ITribalCouncilTribe {
  tribalCouncilId: number
  tribeId: number
}
