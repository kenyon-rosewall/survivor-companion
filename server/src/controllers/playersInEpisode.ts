import { Request, Response, NextFunction } from 'express'
import prismaClient from '../modules/prismaClient'

const getPlayersInEpisode = async (req: Request, res: Response) => {
  const episodeId: number = +req.params.episodeId
  const playersInEpisode = await prismaClient.playerInEpisode.findMany({
    where: { episodeId: episodeId },
    include: {
      player: true,
      tribe: true,
      advantages: true,
      alliances: true
    },
    orderBy: { player: { name: 'asc' } }
  })

  return res.status(200).json({
    data: playersInEpisode
  })
}

const getPlayerInEpisode = async (req: Request, res: Response) => {
  const playerInEpisodeId: number = +req.params.playerInEpisodeId
  const playerInEpisode = await prismaClient.playerInEpisode.findUnique({
    where: { id: playerInEpisodeId },
    include: {
      player: true,
      tribe: true,
      advantages: true,
      alliances: true
    }
  })

  if (playerInEpisode) {
    return res.status(200).json({
      data: playerInEpisode
    })
  }

  return res.status(404).json({
    data: `Player ${playerInEpisodeId} not found.`
  })
}

const updatePlayerInEpisode = async (req: Request, res: Response) => {
  const playerInEpisodeId: number = Number(req.params.id)
  const playerInEpisode = await prismaClient.playerInEpisode.findUnique({
    where: { id: playerInEpisodeId }
  })

  if (playerInEpisode) {
    const updatedPlayerInEpisode = await prismaClient.playerInEpisode.update({
      where: { id: playerInEpisodeId },
      data: {
        status: req.body.status,
        tribeId: req.body.tribeId,
        shotInTheDark: req.body.shotInTheDark,
        notes: req.body.notes
      }
    })

    return res.status(200).json({
      data: updatedPlayerInEpisode
    })
  }

  return res.status(404).json({
    data: `Player ${playerInEpisodeId} not found.`
  })
}

const deletePlayersInEpisode = async (episodeId: number) => {
  const playersInEpisode = await prismaClient.playerInEpisode.findMany({
    where: { episodeId: episodeId },
    include: {
      advantages: true,
      alliances: true
    }
  })

  for (const playerInEpisode of playersInEpisode) {
    await prismaClient.vote.deleteMany({
      where: {
        OR: [
          { voterId: playerInEpisode.id },
          { votedForId: playerInEpisode.id }
        ]
      }
    })

    await prismaClient.playerInEpisode.update({
      where: { id: playerInEpisode.id },
      data: {
        advantages: {
          disconnect: playerInEpisode.advantages.map((advantage) => {
            return {
              id: advantage.id
            }
          })
        },
        alliances: {
          disconnect: playerInEpisode.alliances.map((alliance) => {
            return {
              id: alliance.id
            }
          })
        }
      }
    })

    await prismaClient.advantageEvent.deleteMany({
      where: { playerInEpisodeId: playerInEpisode.id }
    })

    await prismaClient.elimination.deleteMany({
      where: { playerInEpisodeId: playerInEpisode.id }
    })

    await prismaClient.playerInEpisode.delete({
      where: { id: playerInEpisode.id }
    })
  }
}

const importPlayersInEpisode = async (episodeId: number) => {
  const episode = await prismaClient.episode.findUnique({
    where: { id: episodeId }
  })
  if (episode) {
    const players = await prismaClient.playerOnSeason.findMany({
      where: { seasonId: episode.seasonId }
    })
    if (players) {
      for (const player of players) {
        await prismaClient.playerInEpisode.create({
          data: {
            playerId: player.playerId,
            episodeId: episodeId,
            status: 'playing',
            shotInTheDark: true
          }
        })
      }
    }
  }
}

const copyPlayersInEpisode = async (episodeId: number) => {
  const episode = await prismaClient.episode.findUnique({
    where: { id: episodeId }
  })

  if (episode) {
    const seasonId: number = episode.seasonId
    const prevEpisodeOrder: number = episode.order - 1
    const prevEpisode = await prismaClient.episode.findFirst({
      where: {
        seasonId: seasonId,
        order: prevEpisodeOrder
      },
      include: {
        playersInEpisode: {
          include: {
            player: true,
            tribe: true,
            advantages: true,
            alliances: true
          }
        }
      }
    })

    if (prevEpisode) {
      for (const playerInEpisode of prevEpisode.playersInEpisode) {
        await prismaClient.playerInEpisode.create({
          data: {
            playerId: playerInEpisode.playerId,
            episodeId: episodeId,
            tribeId: playerInEpisode.tribeId,
            status: playerInEpisode.status,
            shotInTheDark: playerInEpisode.shotInTheDark,
            advantages: {
              connect: playerInEpisode.advantages.map((advantage) => {
                return {
                  id: advantage.id
                }
              })
            },
            alliances: {
              connect: playerInEpisode.alliances.map((alliance) => {
                return {
                  id: alliance.id
                }
              })
            }
          }
        })
      }
    }
  }
}

const initPlayersInEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const episodeId: number = Number(req.params.episodeId)
    const premiere: boolean = req.body.premiere

    deletePlayersInEpisode(episodeId)

    if (premiere) {
      await importPlayersInEpisode(episodeId)
    } else {
      await copyPlayersInEpisode(episodeId)
    }

    const playersInEpisode = await prismaClient.playerInEpisode.findMany({
      where: { episodeId: episodeId },
      include: {
        player: true,
        tribe: true,
        advantages: true,
        alliances: true
      },
      orderBy: [
        {
          status: 'desc'
        },
        {
          player: { id: 'asc' }
        }
      ]
    })

    return res.status(201).json({
      data: playersInEpisode
    })
  } catch (err) {
    next(err)
  }
}

const getPlayingPlayersInEpisode = async (req: Request, res: Response) => {
  const episodeId: number = Number(req.params.episodeId)

  const players = await prismaClient.playerInEpisode.findMany({
    where: {
      episodeId: episodeId,
      status: {
        not: 'eliminated'
      }
    },
    include: { player: true }
  })

  return res.status(200).json({
    data: players
  })
}

export default {
  getPlayersInEpisode,
  getPlayerInEpisode,
  updatePlayerInEpisode,
  initPlayersInEpisode,
  getPlayingPlayersInEpisode
}
