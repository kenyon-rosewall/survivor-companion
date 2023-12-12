import { Request, Response, NextFunction } from 'express'
import prismaClient from '../modules/prismaClient'
import dt from '../modules/date'

const extractEpisodeData = (req: Request, seasonId?: number) => {
  const data: any = {
    order: Number(req.body.order),
    name: req.body.name,
    airingDate: dt.parse(req.body.airingDate),
    premiere: req.body.premiere,
    merge: req.body.merge,
    final: req.body.final,
    notes: req.body.notes
  }

  if (typeof seasonId !== 'undefined') {
    data.seasonId = seasonId
  }

  return data
}

const getEpisodes = async (req: Request, res: Response, next: NextFunction) => {
  const episodes = await prismaClient.episode.findMany()

  return res.status(200).json({
    data: episodes
  })
}

const getEpisodesBySeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const seasonId: number = +req.params.seasonId

  if (seasonId > 0) {
    const episodes = await prismaClient.episode.findMany({
      where: { seasonId: seasonId }
    })

    return res.status(200).json({
      data: episodes
    })
  }

  return res.status(404).json({
    data: `Season ${seasonId} not found.`
  })
}

const getEpisode = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = +req.params.id
  const episode = await prismaClient.episode.findUnique({
    where: { id: id }
  })

  if (episode) {
    return res.status(200).json({
      data: episode
    })
  }

  return res.status(404).json({
    data: `Episode ${id} not found.`
  })
}

const updateEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = +req.params.id
  const episode = await prismaClient.episode.findUnique({
    where: { id: id }
  })

  if (episode) {
    const updatedEpisode = await prismaClient.episode.update({
      where: { id: id },
      data: extractEpisodeData(req)
    })

    return res.status(200).json({
      data: updatedEpisode
    })
  }

  return res.status(404).json({
    data: `Episode ${id} not found.`
  })
}

const deleteEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = +req.params.id
  const deletedEpisode = await prismaClient.episode.delete({
    where: { id: id }
  })

  if (deletedEpisode) {
    return res.status(200).json({
      data: deletedEpisode
    })
  }

  return res.status(404).json({
    data: `Episode ${id} not found.`
  })
}

const addEpisode = async (req: Request, res: Response, next: NextFunction) => {
  const episode = await prismaClient.episode.create({
    data: extractEpisodeData(req, +req.params.seasonId)
  })

  const season = await prismaClient.season.findUnique({
    where: { id: +req.params.seasonId }
  })
  if (season) {
    await prismaClient.season.update({
      where: { id: +req.params.seasonId },
      data: {
        episodeCount: +season.episodeCount + 1
      }
    })
  }

  return res.status(201).json({
    data: episode
  })
}

export default {
  getEpisodes,
  getEpisodesBySeason,
  getEpisode,
  updateEpisode,
  deleteEpisode,
  addEpisode
}
