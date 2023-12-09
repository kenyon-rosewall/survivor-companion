import { put } from "./core"

export async function updatePlayerInEpisode(
  playerInEpisodeId: number,
  body: any,
  callback: (d: any) => void
) {
  put(`/playerInEpisodes/${playerInEpisodeId}`, body, callback)
}
