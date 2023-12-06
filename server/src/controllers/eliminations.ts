import { Request, Response, NextFunction } from "express"
import prismaClient from "../modules/prismaClient"

const extractEliminationData = (req: Request) => ({
  playerInEpisodeId: Number(req.body.playerInEpisodeId),
  order: Number(req.body.order),
  category: req.body.category,
  notes: req.body.notes,
})

const getEliminationsFromEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const episodeId: number = Number(req.params.episodeId)
  const eliminatedPlayers = await prismaClient.playerInEpisode.findMany({
    where: {
      episodeId: episodeId,
      status: { not: "playing" },
    },
  })

  if (eliminatedPlayers.length > 0) {
    const eliminations = await prismaClient.elimination.findMany({
      where: {
        playerInEpisodeId: {
          in: eliminatedPlayers.map((player) => player.id),
        },
      },
      include: {
        playerInEpisode: {
          include: {
            player: true,
          },
        },
      },
    })

    if (eliminations) {
      return res.status(200).json({
        data: eliminations,
      })
    }
  }

  return res.status(200).json({
    data: [],
  })
}

const getElimination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const elimination = await prismaClient.elimination.findUnique({
    where: { id: id },
  })

  if (elimination) {
    return res.status(200).json({
      data: elimination,
    })
  }

  return res.status(404).json({
    data: `Elimination ${id} not found.`,
  })
}

const updateElimination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const elimination = await prismaClient.elimination.findUnique({
    where: { id: id },
  })

  if (elimination) {
    const updatedElimination = await prismaClient.elimination.update({
      where: { id: id },
      data: extractEliminationData(req),
    })

    return res.status(200).json({
      data: updatedElimination,
    })
  }

  return res.status(404).json({
    data: `Elimination ${id} not found.`,
  })
}

const deleteElimination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const elimination = await prismaClient.elimination.delete({
    where: { id: id },
  })

  if (elimination) {
    const playerInEpisode = await prismaClient.playerInEpisode.update({
      where: { id: elimination.playerInEpisodeId },
      data: { status: "playing" },
    })

    return res.status(204).json({})
  }

  return res.status(404).json({
    data: `Elimination ${id} not found.`,
  })
}

const addElimination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const elimination = await prismaClient.elimination.create({
    data: extractEliminationData(req),
  })

  let newStatus = ""
  switch (elimination.category) {
    case "redemption":
      newStatus = "redemption"
      break
    case "edge":
      newStatus = "edge"
      break
    default:
      newStatus = "eliminated"
      break
  }

  const playerInEpisode = await prismaClient.playerInEpisode.update({
    where: { id: elimination.playerInEpisodeId },
    data: { status: newStatus },
  })

  return res.status(201).json({
    data: elimination,
  })
}

const getTotalEliminationCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const seasonId: number = Number(req.params.seasonId)
  const eliminations = await prismaClient.elimination.findMany({
    where: {
      playerInEpisode: {
        episode: {
          seasonId: seasonId,
        },
      },
    },
    select: {
      id: true,
    },
  })

  return res.status(200).json({
    data: eliminations.length,
  })
}

export default {
  getEliminationsFromEpisode,
  getElimination,
  updateElimination,
  deleteElimination,
  addElimination,
  getTotalEliminationCount,
}
