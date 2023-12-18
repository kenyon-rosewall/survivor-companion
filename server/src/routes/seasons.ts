import express from 'express'
import seasonController from '../controllers/seasons'
import episodeController from '../controllers/episodes'
import playerOnSeasonController from '../controllers/playerOnSeasons'
import tribeController from '../controllers/tribes'
import allianceController from '../controllers/alliances'
import eliminationController from '../controllers/eliminations'
const router = express.Router()

router.get('/', seasonController.getSeasons)
router.get('/:id', seasonController.getSeason)
router.put('/:id', seasonController.updateSeason)
router.delete('/:id', seasonController.deleteSeason)
router.post('/', seasonController.addSeason)

router.get('/:seasonId/episodes', episodeController.getEpisodesBySeason)
router.post('/:seasonId/episodes', episodeController.addEpisode)

router.get('/:seasonId/players', playerOnSeasonController.getPlayerOnSeasons)
router.get(
  '/:seasonId/players/:playerId',
  playerOnSeasonController.getPlayerOnSeason
)
router.put(
  '/:seasonId/players/:playerId',
  playerOnSeasonController.updatePlayerOnSeason
)
router.delete(
  '/:seasonId/players/:playerId',
  playerOnSeasonController.deletePlayerOnSeason
)
router.post('/:seasonId/players', playerOnSeasonController.addPlayerOnSeason)

router.get('/:seasonId/tribes', tribeController.getTribesBySeason)
router.post('/:seasonId/tribes', tribeController.addTribe)

router.get('/:seasonId/alliances', allianceController.getAlliancesBySeason)
router.post('/:seasonId/alliances', allianceController.addAlliance)

router.get(
  '/:seasonId/eliminations/count',
  eliminationController.getTotalEliminationCount
)
router.get(
  '/:seasonId/eliminations',
  eliminationController.getEliminationsFromSeason
)

export = router
