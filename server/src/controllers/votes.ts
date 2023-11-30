import { Request, Response, NextFunction } from "express"
import prismaClient from "../modules/prismaClient"

const extractVoteData = (req: Request) => ({
  tribalCouncilId: req.body.tribalCouncilId,
  voterId: Number(req.body.voterId),
  votedForId: Number(req.body.votedForId),
  doesNotCount: req.body.doesNotCount,
  didNotVote: req.body.didNotVote,
  category: req.body.category,
})

const getVotesFromTribalCouncil = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tribalCouncilId: number = Number(req.params.tribalCouncilId)
  const votes = await prismaClient.vote.findMany({
    where: { tribalCouncilId: tribalCouncilId },
  })

  return res.status(200).json({
    data: votes,
  })
}

const deleteVote = async (req: Request, res: Response, next: NextFunction) => {
  const tribalCouncilId: number = Number(req.params.tribalCouncilId)
  const voterId: number = Number(req.params.voterId)
  const vote = await prismaClient.vote.delete({
    where: {
      tribalCouncilId_voterId: {
        tribalCouncilId: tribalCouncilId,
        voterId: voterId,
      },
    },
  })

  if (vote) {
    return res.status(204).json({})
  }

  return res.status(404).json({
    data: `Vote by ${voterId} at ${tribalCouncilId} not found.`,
  })
}

const addVote = async (req: Request, res: Response, next: NextFunction) => {
  const vote = await prismaClient.vote.create({
    data: extractVoteData(req),
  })

  switch (vote.category) {
    case "shotInTheDark":
      await prismaClient.playerInEpisode.update({
        where: { id: vote.voterId },
        data: { shotInTheDark: false },
      })
      break
  }

  return res.status(201).json({
    data: vote,
  })
}

export default { getVotesFromTribalCouncil, deleteVote, addVote }
