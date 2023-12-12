import { get, put } from "./core"

export async function readTribe(tribeId: number, callback: (d: any) => void) {
  get(`/tribes/${tribeId}`, callback)
}

export async function updateTribe(
  tribeId: number,
  tribeData: any,
  callback: (d: any) => void
) {
  put(`/tribes/${tribeId}`, tribeData, callback)
}

export async function readTribeMembers(
  tribeId: number,
  callback: (d: any) => void
) {
  get(`/tribes/${tribeId}/members`, callback)
}
