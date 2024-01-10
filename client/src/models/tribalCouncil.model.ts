import { IEpisode } from './episode.model'
import { ITribe } from './tribe.model'
import { IVote } from './vote.model'

export interface ITribalCouncil {
  id: number
  episode?: IEpisode
  episodeId: number
  tribes?: ITribe[]
  votes?: IVote[]
  notes?: string
  final?: boolean
}
