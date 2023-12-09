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

export async function createPlayersInEpisode(
  episodeId: number,
  episodePremiere: boolean,
  callback: (d: any) => void
) {
  const body = { premiere: episodePremiere }
  post(`/episodes/${episodeId}/players`, body, callback)
}

export async function getTribalCouncilsInEpisode(
  episodeId: number,
  callback: (d: any) => void
) {
  get(`/episodes/${episodeId}/tribalCouncils`, callback)
}

export async function createTribalCouncil(
  episodeId: number,
  callback: (d: any) => void
) {
  const body = { episodeId: episodeId }
  post(`/episodes/${episodeId}/tribalCouncils`, body, callback)
}
