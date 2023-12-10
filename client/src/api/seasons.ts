import { get, post } from "./core"

export async function readSeason(seasonId: number, callback: (d: any) => void) {
  get(`/seasons/${seasonId}`, callback)
}

export async function readSeasonTribes(
  seasonId: number,
  callback: (d: any) => void
) {
  get(`/seasons/${seasonId}/tribes`, callback)
}

export async function readSeasonAlliances(
  seasonId: number,
  callback: (d: any) => void
) {
  get(`/seasons/${seasonId}/alliances`, callback)
}

export async function createSeasonAlliance(
  seasonId: number,
  allianceData: any,
  callback: (d: any) => void
) {
  post(`/seasons/${seasonId}/alliances`, allianceData, callback)
}
