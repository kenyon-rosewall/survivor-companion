import { get, post, put } from "./core"

export async function readAdvantages(callback: (data: any) => void) {
  return get(`/advantages`, callback)
}

export async function createAdvantage(
  advantageData: any,
  callback: (data: any) => void
) {
  return post(`/advantages`, advantageData, callback)
}

export async function readAdvantage(
  advantageId: number,
  callback: (data: any) => void
) {
  return get(`/advantages/${advantageId}`, callback)
}

export async function updateAdvantage(
  advantageId: number,
  advantageData: any,
  callback: (data: any) => void
) {
  return put(`/advantages/${advantageId}`, advantageData, callback)
}
