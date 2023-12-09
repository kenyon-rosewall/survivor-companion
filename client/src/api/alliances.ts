import { del } from "./core"

export async function removeAlliancePlayer(
  allianceId: number,
  playerId: number,
  callback: (d: any) => void
) {
  del(`/alliances/${allianceId}/players/${playerId}`, callback)
}
