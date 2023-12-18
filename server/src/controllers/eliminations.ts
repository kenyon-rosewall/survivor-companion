import { Request, Response } from 'express'
import prismaClient from '../modules/prismaClient'

const extractEliminationData = (req: Request) => ({
  playerInEpisodeId: Number(req.body.playerInEpisodeId),
  order: Number(req.body.order),
  category: req.body.category,
  notes: req.body.notes
})

const uniquePlayersInEpisode = (episodes: any[]) => {
  const playersInEpisode: any[] = episodes
    .map((episode: any) => episode.playersInEpisode)
    .reduce((prev: any, curr: any) => prev.concat(curr), [])
    .filter(
      (playerInEpisode: never, index: number, arr: []) =>
        arr.indexOf(playerInEpisode) === index
    )

  const unique: any[] = []
  for (const playerInEpisode of playersInEpisode) {
    if (!playerInEpisode) continue
    if (unique.map((p: any) => p.id).includes(playerInEpisode.id)) continue

    unique.push(playerInEpisode)
  }

  return unique
}

const getEliminationsFromEpisode = async (req: Request, res: Response) => {
  const episodeId: number = Number(req.params.episodeId)
  const eliminatedPlayers = await prismaClient.playerInEpisode.findMany({
    where: {
      episodeId: episodeId,
      status: { not: 'playing' }
    }
  })

  if (eliminatedPlayers.length > 0) {
    const eliminations = await prismaClient.elimination.findMany({
      where: {
        playerInEpisodeId: {
          in: eliminatedPlayers.map((player) => player.id)
        }
      },
      include: {
        playerInEpisode: {
          include: {
            player: true
          }
        }
      }
    })

    if (eliminations) {
      return res.status(200).json({
        data: eliminations
      })
    }
  }

  return res.status(200).json({
    data: []
  })
}

const getEliminationsFromSeason = async (req: Request, res: Response) => {
  const seasonId: number = Number(req.params.seasonId)
  const episodes = await prismaClient.episode.findMany({
    where: {
      seasonId: seasonId
    },
    include: {
      playersInEpisode: true
    }
  })

  if (episodes) {
    const playersInEpisode = uniquePlayersInEpisode(episodes)
    const eliminations = await prismaClient.elimination.findMany({
      where: {
        playerInEpisodeId: {
          in: playersInEpisode.map((player) => player.id)
        }
      }
    })

    if (eliminations) {
      return res.status(200).json({
        data: eliminations
      })
    }
  }

  return res.status(200).json({
    data: []
  })
}

const getElimination = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id)
  const elimination = await prismaClient.elimination.findUnique({
    where: { id: id }
  })

  if (elimination) {
    return res.status(200).json({
      data: elimination
    })
  }

  return res.status(404).json({
    data: `Elimination ${id} not found.`
  })
}

const updateElimination = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id)
  const elimination = await prismaClient.elimination.findUnique({
    where: { id: id }
  })

  if (elimination) {
    const updatedElimination = await prismaClient.elimination.update({
      where: { id: id },
      data: extractEliminationData(req)
    })

    return res.status(200).json({
      data: updatedElimination
    })
  }

  return res.status(404).json({
    data: `Elimination ${id} not found.`
  })
}

const deleteElimination = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id)
  const elimination = await prismaClient.elimination.delete({
    where: { id: id }
  })

  if (elimination) {
    await prismaClient.playerInEpisode.update({
      where: { id: elimination.playerInEpisodeId },
      data: { status: 'playing' }
    })

    return res.status(200).json({
      data: elimination
    })
  }

  return res.status(404).json({
    data: `Elimination ${id} not found.`
  })
}

const addElimination = async (req: Request, res: Response) => {
  const elimination = await prismaClient.elimination.create({
    data: extractEliminationData(req)
  })

  let newStatus = ''
  switch (elimination.category) {
    case 'redemption':
      newStatus = 'redemption'
      break
    case 'edge':
      newStatus = 'edge'
      break
    default:
      newStatus = 'eliminated'
      break
  }

  await prismaClient.playerInEpisode.update({
    where: { id: elimination.playerInEpisodeId },
    data: { status: newStatus }
  })

  return res.status(201).json({
    data: elimination
  })
}

const getTotalEliminationCount = async (req: Request, res: Response) => {
  const seasonId: number = Number(req.params.seasonId)
  const eliminations = await prismaClient.elimination.findMany({
    where: {
      playerInEpisode: {
        episode: {
          seasonId: seasonId
        }
      }
    },
    select: {
      id: true
    }
  })

  return res.status(200).json({
    data: eliminations.length
  })
}

export default {
  getEliminationsFromEpisode,
  getEliminationsFromSeason,
  getElimination,
  updateElimination,
  deleteElimination,
  addElimination,
  getTotalEliminationCount
}
