import express from 'express'
import episodeController from '../controllers/episodes'
import playerInEpisodeController from '../controllers/playersInEpisode'
import tribalCouncilController from '../controllers/tribalCouncils'
import eliminationController from '../controllers/eliminations'
import advantageEventController from '../controllers/advantageEvents'
const router = express.Router()

router.get('/', episodeController.getEpisodes)
router.get('/:id', episodeController.getEpisode)
router.put('/:id', episodeController.updateEpisode)
router.delete('/:id', episodeController.deleteEpisode)

router.get('/:episodeId/players', playerInEpisodeController.getPlayersInEpisode)
router.get(
  '/:episodeId/players/playing',
  playerInEpisodeController.getPlayingPlayersInEpisode
)
router.post(
  '/:episodeId/players',
  playerInEpisodeController.initPlayersInEpisode
)

router.get(
  '/:episodeId/tribalCouncils',
  tribalCouncilController.getTribalCouncilsFromEpisode
)
router.post(
  '/:episodeId/tribalCouncils',
  tribalCouncilController.addTribalCouncil
)

router.get(
  '/:episodeId/eliminations',
  eliminationController.getEliminationsFromEpisode
)
router.post('/:episodeId/eliminations', eliminationController.addElimination)

router.get(
  '/:episodeId/advantageEvents',
  advantageEventController.getAdvantageEventsFromEpisode
)
router.post(
  '/:episodeId/advantageEvents',
  advantageEventController.addAdvantageEvent
)

export = router
