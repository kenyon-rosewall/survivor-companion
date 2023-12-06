import { Request, Response, NextFunction } from "express"
import prismaClient from "../modules/prismaClient"
import legalColors from "../modules/colors"

const extractAllianceData = (
  req: Request,
  color: string,
  seasonId?: number
) => {
  const data: any = {
    name: req.body.name,
    color: color,
    notes: req.body.notes,
  }

  if (typeof seasonId !== "undefined") {
    data.seasonId = seasonId
  }

  return data
}

const getAllianceColor = async (seasonId: number, color: string) => {
  if (color !== "") return color

  const tribeColors = await prismaClient.tribe.findMany({
    where: { seasonId: seasonId },
    select: { color: true },
  })

  if (tribeColors.length > 0) {
    const usedColors = tribeColors.map((tribe) => tribe.color)
    const availableColors = legalColors.filter(
      (color) => !usedColors.includes(color)
    )

    if (availableColors.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableColors.length)
      color = availableColors[randomIndex]

      return color
    }
  }

  return ""
}

const getAlliancesBySeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const seasonId: number = Number(req.params.seasonId)

  if (seasonId > 0) {
    const alliances = await prismaClient.alliance.findMany({
      where: { seasonId: seasonId },
      include: {
        alliancePlayers: {
          include: {
            player: true,
          },
        },
      },
    })

    return res.status(200).json({
      data: alliances,
    })
  }

  return res.status(404).json({
    data: `Season ${seasonId} not found.`,
  })
}

const getAlliance = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = Number(req.params.id)
  const alliance = await prismaClient.alliance.findUnique({
    where: { id: id },
    include: {
      alliancePlayers: {
        include: {
          player: true,
        },
      },
    },
  })

  if (alliance) {
    return res.status(200).json({
      data: alliance,
    })
  }

  return res.status(404).json({
    data: `Alliance ${id} not found.`,
  })
}

const updateAlliance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const alliance = await prismaClient.alliance.findUnique({
    where: { id: id },
  })

  if (alliance) {
    const seasonId: number = Number(req.body.seasonId)
    const color: string = await getAllianceColor(seasonId, req.body.color)
    const updatedAlliance = await prismaClient.alliance.update({
      where: { id: id },
      data: extractAllianceData(req, color, seasonId),
    })

    return res.status(200).json({
      data: updateAlliance,
    })
  }

  return res.status(404).json({
    data: `Alliance ${id} not found.`,
  })
}

const deleteAlliance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const alliance = await prismaClient.alliance.findUnique({
    where: { id: id },
    include: {
      alliancePlayers: true,
    },
  })

  if (alliance) {
    const updatedAlliance = await prismaClient.alliance.update({
      where: { id: id },
      data: {
        alliancePlayers: {
          disconnect: alliance.alliancePlayers.map((player) => ({
            id: player.id,
          })),
        },
      },
    })

    const deletedAlliance = await prismaClient.alliance.delete({
      where: { id: id },
    })

    if (deletedAlliance) {
      return res.status(204).json({})
    }
  }

  return res.status(404).json({
    data: `Alliance ${id} not found.`,
  })
}

const addAlliance = async (req: Request, res: Response, next: NextFunction) => {
  const seasonId: number = Number(req.params.seasonId)
  const color: string = await getAllianceColor(seasonId, req.body.color)
  const alliance = await prismaClient.alliance.create({
    data: extractAllianceData(req, color, seasonId),
  })

  return res.status(201).json({
    data: alliance,
  })
}

const addPlayer = async (req: Request, res: Response, next: NextFunction) => {
  const allianceId: number = Number(req.params.id)
  const playerId: number = Number(req.body.playerId)
  const episodeId: number = Number(req.body.episodeId)

  const playerInEpisode = await prismaClient.playerInEpisode.findMany({
    where: {
      episodeId: episodeId,
      playerId: playerId,
    },
  })

  if (playerInEpisode && playerInEpisode.length === 1) {
    const alliance = await prismaClient.alliance.update({
      where: { id: allianceId },
      data: {
        alliancePlayers: {
          connect: {
            id: playerInEpisode[0].id,
          },
        },
      },
    })

    return res.status(201).json({
      data: alliance,
    })
  }
}

const deletePlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allianceId: number = Number(req.params.id)
  const playerId: number = Number(req.params.playerId)
  const alliance = await prismaClient.alliance.update({
    where: {
      id: allianceId,
    },
    data: {
      alliancePlayers: {
        disconnect: {
          id: playerId,
        },
      },
    },
  })

  if (alliance) {
    return res.status(204).json({})
  }

  return res.status(404).json({
    data: `Player ${playerId} not found in alliance ${allianceId}.`,
  })
}

export default {
  getAlliancesBySeason,
  getAlliance,
  updateAlliance,
  deleteAlliance,
  addAlliance,
  addPlayer,
  deletePlayer,
}
