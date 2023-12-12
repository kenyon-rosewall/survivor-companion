import { Request, Response, NextFunction } from 'express'
import prismaClient from '../modules/prismaClient'
import { exit } from 'process'

const extractVoteData = (req: Request, votedForId?: number | undefined) => {
  const data: any = {
    tribalCouncilId: req.body.tribalCouncilId,
    voterId: Number(req.body.voterId),
    doesNotCount: req.body.doesNotCount,
    didNotVote: req.body.didNotVote,
    category: req.body.category
  }

  if (typeof votedForId !== 'undefined' && votedForId !== 0) {
    data.votedForId = Number(votedForId)
  }

  return data
}

const getVotesFromTribalCouncil = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tribalCouncilId: number = Number(req.params.tribalCouncilId)
  const votes = await prismaClient.vote.findMany({
    where: { tribalCouncilId: tribalCouncilId }
  })

  return res.status(200).json({
    data: votes
  })
}

const deleteVote = async (req: Request, res: Response, next: NextFunction) => {
  const voteId: number = Number(req.params.voteId)
  const vote = await prismaClient.vote.delete({
    where: {
      id: voteId
    }
  })

  if (vote) {
    return res.status(200).json({
      data: vote
    })
  }

  return res.status(404).json({
    data: `Vote ${voteId} not found.`
  })
}

const addVote = async (req: Request, res: Response, next: NextFunction) => {
  const vote = await prismaClient.vote.create({
    data: extractVoteData(req, req.body.votedForId)
  })

  switch (vote.category) {
    case 'shotInTheDark':
      await prismaClient.playerInEpisode.update({
        where: { id: vote.voterId },
        data: { shotInTheDark: false }
      })
      break
  }

  return res.status(201).json({
    data: vote
  })
}

export default { getVotesFromTribalCouncil, deleteVote, addVote }
