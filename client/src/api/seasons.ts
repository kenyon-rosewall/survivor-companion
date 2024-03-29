import { get, post, put } from './core'

export async function readSeasons(callback: (d: any) => void) {
  get('/seasons', callback)
}

export async function createSeason(
  seasonData: any,
  callback: (d: any) => void
) {
  post('/seasons', seasonData, callback)
}

export async function readSeason(seasonId: number, callback: (d: any) => void) {
  get(`/seasons/${seasonId}`, callback)
}

export async function updateSeason(
  seasonId: number,
  seasonData: any,
  callback: (d: any) => void
) {
  put(`/seasons/${seasonId}`, seasonData, callback)
}

export async function readSeasonTribes(
  seasonId: number,
  callback: (d: any) => void
) {
  get(`/seasons/${seasonId}/tribes`, callback)
}

export async function createSeasonTribe(
  seasonId: number,
  tribeData: any,
  callback: (d: any) => void
) {
  post(`/seasons/${seasonId}/tribes`, tribeData, callback)
}

export async function readSeasonAlliances(
  seasonId: number,
  callback: (d: any) => void
) {
  get(`/seasons/${seasonId}/alliances`, callback)
}

export async function readSeasonPlayers(
  seasonId: number,
  callback: (d: any) => void
) {
  get(`/seasons/${seasonId}/players`, callback)
}

export async function createSeasonPlayer(
  seasonId: number,
  playerData: any,
  callback: (d: any) => void
) {
  post(`/seasons/${seasonId}/players`, playerData, callback)
}

export async function readSeasonPlayer(
  seasonId: number,
  playerId: number,
  callback: (d: any) => void
) {
  get(`/seasons/${seasonId}/players/${playerId}`, callback)
}

export async function updateSeasonPlayer(
  seasonId: number,
  playerId: number,
  playerData: any,
  callback: (d: any) => void
) {
  put(`/seasons/${seasonId}/players/${playerId}`, playerData, callback)
}

export async function createSeasonAlliance(
  seasonId: number,
  allianceData: any,
  callback: (d: any) => void
) {
  post(`/seasons/${seasonId}/alliances`, allianceData, callback)
}

export async function createSeasonEpisode(
  seasonId: number,
  episodeData: any,
  callback: (d: any) => void
) {
  post(`/seasons/${seasonId}/episodes`, episodeData, callback)
}

export async function readSeasonEpisodes(
  seasonId: number,
  callback: (d: any) => void
) {
  get(`/seasons/${seasonId}/episodes`, callback)
}

export async function readSeasonEliminations(
  seasonId: number,
  callback: (d: any) => void
) {
  get(`/seasons/${seasonId}/eliminations`, callback)
}

export async function readSeasonEliminationCount(
  seasonId: number,
  callback: (d: any) => void
) {
  get(`/seasons/${seasonId}/eliminations/count`, callback)
}
