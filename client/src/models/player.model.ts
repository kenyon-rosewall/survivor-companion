import { IVote } from './vote.model'
import { ITribe } from './tribe.model'
import { IElimination } from './elimination.model'
import { IAdvantage, IAdvantageEvent } from './advantage.model'
import { IAlliance } from './alliance.model'
import { ISeason } from './season.model'
import { IEpisode } from './episode.model'

export enum PlayerStatusEnum {
  Playing = 'playing',
  Eliminated = 'eliminated',
  Redemption = 'redemption',
  Edge = 'edge'
}

export interface IPlayerSearchResult {
  item: IPlayer
  refIndex: number
  score: number
}

export interface IPlayerInEpisode {
  id?: number
  player?: IPlayer
  playerId?: number
  playerName?: string
  episode?: IEpisode
  episodeId?: number
  status: PlayerStatusEnum
  castVotes?: IVote[]
  receivedVotes?: IVote[]
  tribe?: ITribe
  tribeId?: number
  elimination?: IElimination
  advantages?: IAdvantage[]
  alliances?: IAlliance[]
  advantagePlays?: IAdvantageEvent[]
  shotInTheDark: boolean
  fireTokens?: number
  notes?: string
}

export interface IPlayerOnSeason {
  id: number
  player?: IPlayer
  playerId: number
  season?: ISeason
  seasonId: number
  headshot?: string
  occupation?: string
  residenceLocation?: string
  notes?: string
  playerInEpisodes?: IPlayerInEpisode[]
}

export interface IPlayer {
  id: number
  name: string
  nickname?: string
  birthday: string
  hometown?: string
  notes?: string
  playerInEpisodes?: IPlayerInEpisode[]
  playerOnSeasons?: IPlayerOnSeason[]
}

export interface IPlayerMeta {
  playerId: number
  name: string
  nickname: string | undefined
  birthday: string
  headshot: string | undefined
  occupation: string | undefined
  hometown: string | undefined
  residenceLocation: string | undefined
  playerNotes: string | undefined
  playerOnSeasonNotes: string | undefined
}
