import { get, post } from "./core"

export async function getEpisode(
  episodeId: number,
  callback: (d: any) => void
) {
  get(`/episodes/${episodeId}`, callback)
}

export async function getPlayersInEpisode(
  episodeId: number,
  callback: (d: any) => void
) {
  get(`/episodes/${episodeId}/players`, callback)
}
