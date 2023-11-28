import { Request, Response, NextFunction } from "express"
import prismaClient from "../modules/prismaClient"

const extractTribalCouncilData = (req: Request) => ({
  episodeId: req.body.episodeId,
  notes: req.body.notes,
})

const getTribalCouncilsFromEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const episodeId: number = Number(req.params.episodeId)
  const tribalCouncils = await prismaClient.tribalCouncil.findMany({
    where: { episodeId: episodeId },
  })

  return res.status(200).json({
    data: tribalCouncils,
  })
}

const getTribalCouncil = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const tribalCouncil = await prismaClient.tribalCouncil.findUnique({
    where: { id: id },
    include: {
      votes: {
        include: {
          voter: true,
          votedFor: true,
        },
      },
      tribes: true,
    },
  })

  if (tribalCouncil) {
    return res.status(200).json({
      data: tribalCouncil,
    })
  }

  return res.status(404).json({
    data: `Tribal Council ${id} not found.`,
  })
}

const updateTribalCouncil = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const tribalCouncil = await prismaClient.tribalCouncil.update({
    where: { id: id },
    data: extractTribalCouncilData(req),
  })

  if (tribalCouncil) {
    return res.status(200).json({
      data: tribalCouncil,
    })
  }

  return res.status(404).json({
    data: `Tribal Council ${id} not found.`,
  })
}

const deleteTribalCouncil = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const tribalCouncil = await prismaClient.tribalCouncil.delete({
    where: { id: id },
  })

  if (tribalCouncil) {
    return res.status(204).json({})
  }

  return res.status(404).json({
    data: `Tribal Council ${id} not found.`,
  })
}

const addTribalCouncil = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tribalCouncil = await prismaClient.tribalCouncil.create({
    data: extractTribalCouncilData(req),
  })

  return res.status(201).json({
    data: tribalCouncil,
  })
}

const addTribe = async (req: Request, res: Response, next: NextFunction) => {
  const tribalCouncilId: number = Number(req.params.tribalCouncilId)
  const tribeId: number = Number(req.params.tribeId)
  const tribalCouncil = await prismaClient.tribalCouncil.update({
    where: { id: tribalCouncilId },
    data: {
      tribes: {
        connect: {
          id: tribeId,
        },
      },
    },
  })

  if (tribalCouncil) {
    return res.status(201).json({
      data: tribalCouncil,
    })
  }

  return res.status(404).json({
    data: `Tribal Council ${tribalCouncilId} not found.`,
  })
}

const deleteTribe = async (req: Request, res: Response, next: NextFunction) => {
  const tribalCouncilId: number = Number(req.params.tribalCouncilId)
  const tribeId: number = Number(req.params.tribeId)
  const tribalCouncil = await prismaClient.tribalCouncil.update({
    where: { id: tribalCouncilId },
    data: {
      tribes: {
        disconnect: {
          id: tribeId,
        },
      },
    },
  })

  if (tribalCouncil) {
    return res.status(204).json({})
  }

  return res.status(404).json({
    data: `Tribal Council ${tribalCouncilId} not found.`,
  })
}

export default {
  getTribalCouncilsFromEpisode,
  getTribalCouncil,
  updateTribalCouncil,
  deleteTribalCouncil,
  addTribalCouncil,
  addTribe,
  deleteTribe,
}
