import { get, post } from "./core"

export async function getSeason(seasonId: number, callback: (d: any) => void) {
  get(`/seasons/${seasonId}`, callback)
}

export async function getTribes(seasonId: number, callback: (d: any) => void) {
  get(`/seasons/${seasonId}/tribes`, callback)
}
