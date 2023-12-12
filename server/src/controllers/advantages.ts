import { Request, Response, NextFunction } from 'express'
import prismaClient from '../modules/prismaClient'

const extractAdvantageData = (req: Request) => ({
  name: req.body.name,
  description: req.body.description
})

const getAdvantages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const advantages = await prismaClient.advantage.findMany()

  return res.status(200).json({
    data: advantages
  })
}

const getAdvantage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const advantage = await prismaClient.advantage.findUnique({
    where: { id: id }
  })

  if (advantage) {
    return res.status(200).json({
      data: advantage
    })
  }

  return res.status(404).json({
    data: `Advantage ${id} not found.`
  })
}

const updateAdvantage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const advantage = await prismaClient.advantage.findUnique({
    where: { id: id }
  })

  if (advantage) {
    const updatedAdvantage = await prismaClient.advantage.update({
      where: { id: id },
      data: extractAdvantageData(req)
    })

    return res.status(200).json({
      data: updatedAdvantage
    })
  }

  return res.status(404).json({
    data: `Advantage ${id} not found.`
  })
}

const deleteAdvantage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id)
  const deletedAdvantage = await prismaClient.advantage.delete({
    where: { id: id }
  })

  if (deletedAdvantage) {
    return res.status(200).json({
      data: deletedAdvantage
    })
  }

  return res.status(404).json({
    data: `Advantage ${id} not found.`
  })
}

const addAdvantage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newAdvantage = await prismaClient.advantage.create({
    data: extractAdvantageData(req)
  })

  return res.status(201).json({
    data: newAdvantage
  })
}

export default {
  getAdvantages,
  getAdvantage,
  updateAdvantage,
  deleteAdvantage,
  addAdvantage
}
