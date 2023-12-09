import { Request, Response, NextFunction } from "express"
import prismaClient from "../modules/prismaClient"
import dt from "../modules/date"

const extractSeasonData = (req: Request) => ({
  order: Number(req.body.order),
  name: req.body.name,
  filmingStart: dt.parse(req.body.filmingStart),
  filmingEnd: dt.parse(req.body.filmingEnd),
  airingStart: dt.parse(req.body.airingStart),
  airingEnd: dt.parse(req.body.airingEnd),
  rating: req.body.rating,
  notes: req.body.notes,
  episodeCount: Number(req.body.episodeCount),
})

const getSeasons = async (req: Request, res: Response, next: NextFunction) => {
  const seasons = await prismaClient.season.findMany({
    orderBy: { order: "asc" },
  })

  return res.status(200).json({
    data: seasons,
  })
}

const getSeason = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = +req.params.id
  const season = await prismaClient.season.findUnique({
    where: { id: id },
  })

  if (season) {
    return res.status(200).json({
      data: season,
    })
  }

  return res.status(404).json({
    data: `Season ${id} not found.`,
  })
}

const updateSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = +req.params.id
  const season = await prismaClient.season.findUnique({
    where: { id: id },
  })

  if (season) {
    const updatedSeason = await prismaClient.season.update({
      where: { id: id },
      data: extractSeasonData(req),
    })

    return res.status(200).json({
      data: updatedSeason,
    })
  }

  return res.status(404).json({
    data: `Season ${id} not found.`,
  })
}

const deleteSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = +req.params.id
  const season = await prismaClient.season.delete({
    where: { id: id },
  })

  if (season) {
    return res.status(204).json({
      data: season,
    })
  }

  return res.status(404).json({
    data: `Season ${id} not found.`,
  })
}

const addSeason = async (req: Request, res: Response, next: NextFunction) => {
  const season = await prismaClient.season.create({
    data: extractSeasonData(req),
  })

  return res.status(201).json({
    data: season,
  })
}

export default { getSeasons, getSeason, updateSeason, deleteSeason, addSeason }
