import { get, post, del } from "./core"

export async function getTribalCouncil(
  tribalCouncilId: number,
  callback: (d: any) => void
) {
  get(`/tribalCouncils/${tribalCouncilId}`, callback)
}

export async function getPlayersInTribalCouncil(
  tribalCouncilId: number,
  callback: (d: any) => void
) {
  get(`/tribalCouncils/${tribalCouncilId}/players`, callback)
}

export async function addTribeToTribalCouncil(
  tribeData: any,
  callback: (d: any) => void
) {
  post(
    `/tribalCouncils/${tribeData.tribalCouncilId}/tribes/${tribeData.tribeId}`,
    tribeData,
    callback
  )
}

export async function removeTribeFromTribalCouncil(
  tribalCouncilId: number,
  tribeId: number,
  callback: (d: any) => void
) {
  del(`/tribalCouncils/${tribalCouncilId}/tribes/${tribeId}`, callback)
}

export async function addVoteToTribalCouncil(
  tribalCouncilId: number,
  vote: any,
  callback: (d: any) => void
) {
  post(`/tribalCouncils/${tribalCouncilId}/votes`, vote, callback)
}

export async function removeVoteFromTribalCouncil(
  tribalCouncilId: number,
  voteId: number,
  callback: (d: any) => void
) {
  del(`/tribalCouncils/${tribalCouncilId}/votes/${voteId}`, callback)
}
