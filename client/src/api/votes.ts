import { faTrowelBricks } from '@fortawesome/free-solid-svg-icons'
import { put } from './core'

export async function updateVote(
  voteId: number,
  doesNotCount: boolean,
  callback: (d: any) => void
) {
  const voteData = { doesNotCount: doesNotCount }
  put(`/votes/${voteId}`, voteData, callback)
}
