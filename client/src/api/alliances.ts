import { post, del } from './core'

export async function createAlliancePlayer(
  allianceId: number,
  alliancePlayerData: any,
  callback: (d: any) => void
) {
  post(`/alliances/${allianceId}/players`, alliancePlayerData, callback)
}

export async function deleteAlliance(
  allianceId: number,
  callback: (d: any) => void
) {
  del(`/alliances/${allianceId}`, callback)
}

export async function deleteAlliancePlayer(
  allianceId: number,
  playerId: number,
  callback: (d: any) => void
) {
  del(`/alliances/${allianceId}/players/${playerId}`, callback)
}
