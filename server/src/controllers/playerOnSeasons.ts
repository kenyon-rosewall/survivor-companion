import { Request, Response, NextFunction } from 'express'
import prismaClient from '../modules/prismaClient'

const extractPlayerOnSeasonData = (
  req: Request,
  seasonId?: number,
  playerId?: number
) => {
  const data: any = {
    headshot: req.body.headshot,
    occupation: req.body.occupation,
    residenceLocation: req.body.residenceLocation,
    notes: req.body.playerOnSeasonNotes
  }

  if (typeof seasonId !== 'undefined') {
    data.seasonId = seasonId
  }
  if (typeof playerId !== 'undefined') {
    data.playerId = playerId
  }

  return data
}

const extractPlayerData = (req: Request) => ({
  name: req.body.name,
  nickname: req.body.nickname,
  birthday: new Date(req.body.birthday),
  hometown: req.body.hometown,
  notes: req.body.playerNotes
})

const getPlayerOnSeasons = async (req: Request, res: Response) => {
  const seasonId: number = +req.params.seasonId
  const playerOnSeasons = await prismaClient.playerOnSeason.findMany({
    where: { seasonId: seasonId },
    include: { player: true },
    orderBy: { player: { name: 'asc' } }
  })

  return res.status(200).json({
    data: playerOnSeasons
  })
}

const getPlayerOnSeason = async (req: Request, res: Response) => {
  const seasonId: number = Number(req.params.seasonId)
  const playerId: number = Number(req.params.playerId)
  const playerOnSeason = await prismaClient.playerOnSeason.findUnique({
    where: { playerId_seasonId: { playerId: playerId, seasonId: seasonId } },
    include: { player: true }
  })

  if (playerOnSeason) {
    const playerInEpisodes = await prismaClient.playerInEpisode.findMany({
      where: { playerId: playerId },
      include: {
        episode: true,
        castVotes: {
          include: {
            votedFor: {
              include: {
                player: true
              }
            }
          }
        },
        receivedVotes: true,
        tribe: true,
        advantages: true,
        alliances: true,
        advantagePlays: {
          include: {
            advantage: true
          }
        }
      },
      orderBy: { episode: { order: 'asc' } }
    })

    // playerOnSeason.playerInEpisodes = playerOnEpisodes.
    return res.status(200).json({
      data: {
        ...playerOnSeason,
        playerInEpisodes: playerInEpisodes.filter(
          (pie) => pie.episode.seasonId === seasonId
        )
      }
    })
  }

  return res.status(404).json({
    data: `Player ${playerId} not found on season ${seasonId}.`
  })
}

const updatePlayerOnSeason = async (req: Request, res: Response) => {
  const seasonId: number = +req.params.seasonId
  const playerId: number = +req.params.playerId
  const playerOnSeason = await prismaClient.playerOnSeason.findUnique({
    where: { playerId_seasonId: { playerId: playerId, seasonId: seasonId } }
  })

  if (playerOnSeason) {
    const updatedPlayerOnSeason = await prismaClient.playerOnSeason.update({
      where: { playerId_seasonId: { playerId: playerId, seasonId: seasonId } },
      data: extractPlayerOnSeasonData(req)
    })

    return res.status(200).json({
      data: updatedPlayerOnSeason
    })
  }

  return res.status(404).json({
    data: `Player ${playerId} not found on season ${seasonId}.`
  })
}

const deletePlayerOnSeason = async (req: Request, res: Response) => {
  const seasonId: number = +req.params.seasonId
  const playerId: number = +req.params.playerId
  const deletedPlayerOnSeason = await prismaClient.playerOnSeason.delete({
    where: { playerId_seasonId: { playerId: playerId, seasonId: seasonId } }
  })

  if (deletedPlayerOnSeason) {
    return res.status(200).json({
      data: deletedPlayerOnSeason
    })
  }

  return res.status(404).json({
    data: `Player ${playerId} not found on season ${seasonId}.`
  })
}

const addPlayerOnSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let playerId: number = +req.body.playerId
    if (playerId === 0) {
      const playerData = extractPlayerData(req)
      console.log(playerData)
      const player = await prismaClient.player.create({
        data: playerData
      })
      playerId = player.id
    }

    const playerOnSeason = await prismaClient.playerOnSeason.create({
      data: extractPlayerOnSeasonData(req, +req.params.seasonId, playerId)
    })

    return res.status(201).json({
      data: playerOnSeason
    })
  } catch (err) {
    next(err)
  }
}

export default {
  getPlayerOnSeasons,
  getPlayerOnSeason,
  updatePlayerOnSeason,
  deletePlayerOnSeason,
  addPlayerOnSeason
}
