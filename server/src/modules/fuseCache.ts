import { Player } from '@prisma/client';
import prismaClient from './prismaClient';

type PlayerCache = Player[];
let myPlayerCache: PlayerCache = [];

export const playerFuseOptions = {
  includeScore: true,
  keys: ['name', 'nickname']
};

export const updatePlayerCache = async () => {
  console.log('Updating player cache...');
  myPlayerCache = await prismaClient.player.findMany();
};

export const getPlayerCache = (): PlayerCache => {
  return myPlayerCache;
};
