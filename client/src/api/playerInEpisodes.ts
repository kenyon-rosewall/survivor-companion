import { get, put } from './core'

export async function updatePlayerInEpisode(
  playerInEpisodeId: number,
  playerInEpisode: any,
  callback: (d: any) => void
) {
  put(`/playerInEpisodes/${playerInEpisodeId}`, playerInEpisode, callback)
}

export async function searchPlayers(
  query: string,
  seasonId: number,
  callback: (d: any) => void
) {
  let seasonQuery = ''
  if (seasonId > 0) {
    seasonQuery = `season//${seasonId}`
  }
  if (query.length > 2) {
    get(`/players/${seasonQuery}search/${query}`, callback)
  }
}
