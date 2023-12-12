import { put } from './core'

export async function updatePlayerInEpisode(
  playerInEpisodeId: number,
  playerInEpisode: any,
  callback: (d: any) => void
) {
  put(`/playerInEpisodes/${playerInEpisodeId}`, playerInEpisode, callback)
}
