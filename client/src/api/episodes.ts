import { get, post } from "./core"

export async function readEpisode(
  episodeId: number,
  callback: (d: any) => void
) {
  get(`/episodes/${episodeId}`, callback)
}

export async function readEpisodePlayers(
  episodeId: number,
  callback: (d: any) => void
) {
  get(`/episodes/${episodeId}/players`, callback)
}

export async function createEpisodePlayers(
  episodeId: number,
  episodePremiere: boolean,
  callback: (d: any) => void
) {
  const body = { premiere: episodePremiere }
  post(`/episodes/${episodeId}/players`, body, callback)
}

export async function readEpisodeTribalCouncils(
  episodeId: number,
  callback: (d: any) => void
) {
  get(`/episodes/${episodeId}/tribalCouncils`, callback)
}

export async function readEpisodeEliminations(
  episodeId: number,
  callback: (d: any) => void
) {
  get(`/episodes/${episodeId}/eliminations`, callback)
}

export async function createEpisodeTribalCouncil(
  episodeId: number,
  callback: (d: any) => void
) {
  const body = { episodeId: episodeId }
  post(`/episodes/${episodeId}/tribalCouncils`, body, callback)
}
