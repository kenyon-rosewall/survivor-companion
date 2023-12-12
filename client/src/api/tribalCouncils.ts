import { get, post, del } from "./core"

export async function readTribalCouncil(
  tribalCouncilId: number,
  callback: (d: any) => void
) {
  get(`/tribalCouncils/${tribalCouncilId}`, callback)
}

export async function readTribalCouncilPlayers(
  tribalCouncilId: number,
  callback: (d: any) => void
) {
  get(`/tribalCouncils/${tribalCouncilId}/players`, callback)
}

export async function createTribalCouncilTribe(
  tribeData: any,
  callback: (d: any) => void
) {
  post(
    `/tribalCouncils/${tribeData.tribalCouncilId}/tribes/${tribeData.tribeId}`,
    tribeData,
    callback
  )
}

export async function deleteTribalCouncilTribe(
  tribalCouncilId: number,
  tribeId: number,
  callback: (d: any) => void
) {
  del(`/tribalCouncils/${tribalCouncilId}/tribes/${tribeId}`, callback)
}

export async function createTribalCouncilVote(
  tribalCouncilId: number,
  vote: any,
  callback: (d: any) => void
) {
  post(`/tribalCouncils/${tribalCouncilId}/votes`, vote, callback)
}

export async function deleteTribalCouncilVote(
  tribalCouncilId: number,
  voteId: number,
  callback: (d: any) => void
) {
  del(`/tribalCouncils/${tribalCouncilId}/votes/${voteId}`, callback)
}
