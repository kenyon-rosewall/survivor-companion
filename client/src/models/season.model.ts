import { IEpisode } from './episode.model'
import { ITribe } from './tribe.model'
import { IPlayerOnSeason } from './player.model'
import { IAlliance } from './alliance.model'

export interface ISeason {
  id: number
  order: number
  name?: string
  episodeCount: number
  filmingStart?: string
  filmingEnd?: string
  airingStart?: string
  airingEnd?: string
  rating?: string
  whyItsGood?: string
  whyItsBad?: string
  notes?: string
  episodes?: IEpisode[]
  tribes?: ITribe[]
  playersOnSeason?: IPlayerOnSeason[]
  alliances?: IAlliance[]
  hasFireTokens: boolean
  totalDays: number
}
