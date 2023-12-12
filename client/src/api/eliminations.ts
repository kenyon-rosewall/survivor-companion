import { del } from "./core"

export async function deleteElimination(
  eliminationId: number,
  callback: (d: any) => void
) {
  del(`/eliminations/${eliminationId}`, callback)
}
