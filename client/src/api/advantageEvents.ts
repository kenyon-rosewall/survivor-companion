import { del } from './core'

export async function deleteAdvantageEvent(
  advantageEventId: number,
  callback: (data: any) => void
) {
  return del(`/advantageEvents/${advantageEventId}`, callback)
}
