import { Request, Response, NextFunction } from "express"
import prismaClient from "../modules/prismaClient"
import players from "./players"

const extractAdvantageEventData = (req: Request) => ({
  playerInEpisodeId: Number(req.body.playerInEpisodeId),
  advantageId: Number(req.body.advantageId),
  category: req.body.category,
  notes: req.body.notes,
})

const getAdvantageEventsFromEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const episodeId: number = Number(req.params.episodeId)
  const playersInEpisode = await prismaClient.playerInEpisode.findMany({
    where: {
      episodeId: episodeId,
    },
  })

  if (playersInEpisode.length > 0) {
    const advantageEvents = await prismaClient.advantageEvent.findMany({
      where: {
        playerInEpisodeId: {
          in: playersInEpisode.map((player) => player.id),
        },
      },
      include: {
        playerInEpisode: {
          include: {
            player: true,
          },
        },
        advantage: true,
      },
    })

    if (advantageEvents) {
      return res.status(200).json({
        data: advantageEvents,
      })
    }
  }

  return res.status(200).json({
    data: [],
  })
}

const getAdvantageEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const advantageEvent = await prismaClient.advantageEvent.findUnique({
    where: { id: id },
  })

  if (advantageEvent) {
    return res.status(200).json({
      data: advantageEvent,
    })
  }

  return res.status(404).json({
    data: `Advantage Event ${id} not found.`,
  })
}

const updateAdvantageEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const advantageEvent = await prismaClient.advantageEvent.findUnique({
    where: { id: id },
  })

  if (advantageEvent) {
    const updatedAdvantageEvent = await prismaClient.advantageEvent.update({
      where: { id: id },
      data: extractAdvantageEventData(req),
    })

    return res.status(200).json({
      data: updateAdvantageEvent,
    })
  }

  return res.status(404).json({
    data: `Advantage Event ${id} not found.`,
  })
}

const deleteAdvantageEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const advantageEvent = await prismaClient.advantageEvent.delete({
    where: { id: id },
  })

  if (advantageEvent) {
    const updatedPlayerInEpisode = await prismaClient.playerInEpisode.update({
      where: { id: advantageEvent.playerInEpisodeId },
      data: {
        advantages: {
          disconnect: {
            id: advantageEvent.advantageId,
          },
        },
      },
    })

    return res.status(204).json({
      data: advantageEvent,
    })
  }

  return res.status(404).json({
    data: `Advantage Event ${id} not found.`,
  })
}

const addAdvantageEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const advantageEvent = await prismaClient.advantageEvent.create({
    data: extractAdvantageEventData(req),
  })

  if (advantageEvent) {
    const playerInEpisodeId: number = advantageEvent.playerInEpisodeId
    const playerInEpisode = await prismaClient.playerInEpisode.findUnique({
      where: { id: playerInEpisodeId },
    })

    if (playerInEpisode) {
      switch (advantageEvent.category) {
        case "obtained":
          await prismaClient.playerInEpisode.update({
            where: { id: playerInEpisodeId },
            data: {
              advantages: {
                connect: {
                  id: advantageEvent.advantageId,
                },
              },
            },
          })
          break
        case "played":
        case "transferred":
        case "lost":
        case "expired":
          await prismaClient.playerInEpisode.update({
            where: { id: playerInEpisodeId },
            data: {
              advantages: {
                disconnect: {
                  id: advantageEvent.advantageId,
                },
              },
            },
          })
          break
      }
    }

    return res.status(201).json({
      data: advantageEvent,
    })
  }
}

export default {
  getAdvantageEventsFromEpisode,
  getAdvantageEvent,
  updateAdvantageEvent,
  deleteAdvantageEvent,
  addAdvantageEvent,
}
