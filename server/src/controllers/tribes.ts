import { Request, Response, NextFunction } from 'express';
import prismaClient from '../modules/prismaClient';

const extractTribeData = (req: Request, seasonId?: number) => {
  const data: any = {
    name: req.body.name,
    category: req.body.category,
  }

  if (typeof seasonId !== 'undefined') {
    data.seasonId = seasonId;
  }

  return data;
}

const getTribes = async (req: Request, res: Response, next: NextFunction) => {
  const tribes = await prismaClient.tribe.findMany();

  return res.status(200).json({
    data: tribes
  });
}

const getTribesBySeason = async (req: Request, res: Response, next: NextFunction) => {
  const seasonId: number = +req.params.seasonId;

  if (seasonId > 0) {
    const tribes = await prismaClient.tribe.findMany({
      where: { seasonId: seasonId }
    });

    return res.status(200).json({
      data: tribes
    });
  }

  return res.status(404).json({
    data: `Season ${seasonId} not found.`
  });
}

const getTribe = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = +req.params.id;
  const tribe = await prismaClient.tribe.findUnique({
    where: { id: id }
  });

  if (tribe) {
    return res.status(200).json({
      data: tribe
    });
  }

  return res.status(404).json({
    data: `Tribe ${id} not found.`
  });
}

const updateTribe = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = +req.params.id;
  const tribe = await prismaClient.tribe.findUnique({
    where: { id: id }
  });

  if (tribe) {
    const updatedTribe = await prismaClient.tribe.update({
      where: { id: id },
      data: extractTribeData(req)
    });

    return res.status(200).json({
      data: updatedTribe
    });
  }

  return res.status(404).json({
    data: `Tribe ${id} not found.`
  });
}

const deleteTribe = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = +req.params.id;
  const tribe = await prismaClient.tribe.delete({
    where: { id: id }
  });

  if (tribe) {
    return res.status(204).json({});
  }

  return res.status(404).json({
    data: `Tribe ${id} not found.`
  });
}

const addTribe = async (req: Request, res: Response, next: NextFunction) => {
  const seasonId: number = +req.params.seasonId;
  const season = await prismaClient.season.findUnique({
    where: { id: seasonId }
  });

  if (season) {
    const newTribe = await prismaClient.tribe.create({
      data: extractTribeData(req, seasonId)
    });

    return res.status(201).json({
      data: newTribe
    });
  }

  return res.status(404).json({
    data: `Season ${seasonId} not found.`
  });
}

export default { getTribes, getTribesBySeason, getTribe, updateTribe, deleteTribe, addTribe };
