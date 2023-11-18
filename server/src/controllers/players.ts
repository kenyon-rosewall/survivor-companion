import { Request, Response, NextFunction } from 'express';
import Fuse from 'fuse.js';
import prismaClient from '../modules/prismaClient';
import * as fuseCache from '../modules/fuseCache';
import dt from '../modules/date';

const extractPlayerData = (req: Request) => ({
  name: req.body.name,
  nickname: req.body.nickname,
  birthday: new Date(req.body.birthday),
  notes: req.body.notes
});

const getPlayers = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    data: fuseCache.getPlayerCache()
  });
}

const getPlayer = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = +req.params.id;
  const player = await prismaClient.player.findUnique({
    where: { id: id }
  });

  if (player) {
    return res.status(200).json({
      data: player
    });
  }

  return res.status(404).json({
    data: `Player ${id} not found.`
  });
}

const updatePlayer = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = +req.params.id;
  const player = await prismaClient.player.findUnique({
    where: { id: id }
  });

  if (player) {
    const updatedPlayer = await prismaClient.player.update({
      where: { id: id },
      data: extractPlayerData(req)
    });

    fuseCache.updatePlayerCache();

    return res.status(200).json({
      data: updatedPlayer
    });
  }

  return res.status(404).json({
    data: `Player ${id} not found.`
  });
}

const deletePlayer = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = +req.params.id;
  const deletedPlayer = await prismaClient.player.delete({
    where: { id: id }
  });

  if (deletedPlayer) {
    fuseCache.updatePlayerCache();

    return res.status(204).json({});
  }

  return res.status(404).json({
    data: `Player ${id} not found.`
  });
}

const addPlayer = async (req: Request, res: Response, next: NextFunction) => {
  const newPlayer = await prismaClient.player.create({
    data: extractPlayerData(req)
  });

  fuseCache.updatePlayerCache();

  return res.status(201).json({
    data: newPlayer
  });
}

const searchPlayers = async (req: Request, res: Response, next: NextFunction) => {
  const searchQuery: string = req.params.q as string;

  const fuse = new Fuse(fuseCache.getPlayerCache(), fuseCache.playerFuseOptions);
  const results = fuse.search(searchQuery);

  return res.status(200).json({
    data: results
  });
}

export default { getPlayers, getPlayer, updatePlayer, deletePlayer, addPlayer, searchPlayers };
