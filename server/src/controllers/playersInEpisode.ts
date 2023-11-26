import { Request, Response, NextFunction } from "express"
import prismaClient from "../modules/prismaClient"
import { Prisma } from "@prisma/client"
import players from "./players"

const getPlayersInEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const episodeId: number = +req.params.episodeId
  const playersInEpisode = await prismaClient.playerInEpisode.findMany({
    where: { episodeId: episodeId },
    include: {
      player: true,
      tribe: true,
      advantages: true,
      alliances: true,
    },
    orderBy: { player: { name: "asc" } },
  })

  return res.status(200).json({
    data: playersInEpisode,
  })
}

const getPlayerInEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const playerInEpisodeId: number = +req.params.playerInEpisodeId
  const playerInEpisode = await prismaClient.playerInEpisode.findUnique({
    where: { id: playerInEpisodeId },
    include: {
      player: true,
      tribe: true,
      advantages: true,
      alliances: true,
    },
  })

  if (playerInEpisode) {
    return res.status(200).json({
      data: playerInEpisode,
    })
  }

  return res.status(404).json({
    data: `Player ${playerInEpisodeId} not found.`,
  })
}

// const updatePlayerOnSeason = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const seasonId: number = +req.params.seasonId
//   const playerId: number = +req.params.playerId
//   const playerOnSeason = await prismaClient.playerOnSeason.findUnique({
//     where: { playerId_seasonId: { playerId: playerId, seasonId: seasonId } },
//   })

//   if (playerOnSeason) {
//     const updatedPlayerOnSeason = await prismaClient.playerOnSeason.update({
//       where: { playerId_seasonId: { playerId: playerId, seasonId: seasonId } },
//       data: extractPlayerOnSeasonData(req),
//     })

//     return res.status(200).json({
//       data: updatedPlayerOnSeason,
//     })
//   }

//   return res.status(404).json({
//     data: `Player ${playerId} not found on season ${seasonId}.`,
//   })
// }

// const deletePlayerOnSeason = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const seasonId: number = +req.params.seasonId
//   const playerId: number = +req.params.playerId
//   const deletedPlayerOnSeason = await prismaClient.playerOnSeason.delete({
//     where: { playerId_seasonId: { playerId: playerId, seasonId: seasonId } },
//   })

//   if (deletedPlayerOnSeason) {
//     return res.status(204).json({})
//   }

//   return res.status(404).json({
//     data: `Player ${playerId} not found on season ${seasonId}.`,
//   })
// }

const importPlayersInEpisode = async (episodeId: number) => {
  const episode = await prismaClient.episode.findUnique({
    where: { id: episodeId },
  })
  if (episode) {
    const players = await prismaClient.playerOnSeason.findMany({
      where: { seasonId: episode.seasonId },
    })
    if (players) {
      for (const player of players) {
        const playerInEpisode = await prismaClient.playerInEpisode.create({
          data: {
            playerId: player.playerId,
            episodeId: episodeId,
            tribeId: 0,
            status: "playing",
            shotInTheDark: true,
          },
        })
      }
    }
  }
}

const copyPlayersInEpisode = async (episodeId: number) => {
  const prevEpisodeId: number = episodeId - 1
  const prevEpisode = await prismaClient.episode.findUnique({
    where: { id: prevEpisodeId },
    include: {
      playersInEpisode: {
        include: {
          player: true,
          tribe: true,
          advantages: true,
          alliances: true,
        },
      },
    },
  })

  if (prevEpisode) {
    for (const playerInEpisode of prevEpisode.playersInEpisode) {
      const player = await prismaClient.playerInEpisode.create({
        data: {
          playerId: playerInEpisode.playerId,
          episodeId: episodeId,
          tribeId: playerInEpisode.tribeId,
          status: playerInEpisode.status,
          shotInTheDark: playerInEpisode.shotInTheDark,
          advantages: {
            connect: playerInEpisode.advantages.map((advantage) => {
              return {
                id: advantage.id,
              }
            }),
          },
          alliances: {
            connect: playerInEpisode.alliances.map((alliance) => {
              return {
                id: alliance.id,
              }
            }),
          },
        },
      })
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
    const premiere: boolean = Boolean(req.params.premiere)
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
        alliances: true,
      },
      orderBy: { player: { name: "asc" } },
    })

    return res.status(201).json({
      data: playersInEpisode,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  getPlayersInEpisode,
  getPlayerInEpisode,
  // updatePlayerOnSeason,
  // deletePlayerOnSeason,
  initPlayersInEpisode,
}
