import express from "express"
import episodeController from "../controllers/episodes"
import playerInEpisodeController from "../controllers/playersInEpisode"
import tribalCouncilController from "../controllers/tribalCouncils"
const router = express.Router()

router.get("/", episodeController.getEpisodes)
router.get("/:id", episodeController.getEpisode)
router.put("/:id", episodeController.updateEpisode)
router.delete("/:id", episodeController.deleteEpisode)

router.get("/:episodeId/players", playerInEpisodeController.getPlayersInEpisode)
router.post(
  "/:episodeId/players",
  playerInEpisodeController.initPlayersInEpisode
)

router.get(
  "/:episodeId/tribalCouncils",
  tribalCouncilController.getTribalCouncilsFromEpisode
)
router.post(
  "/:episodeId/tribalCouncils",
  tribalCouncilController.addTribalCouncil
)

export = router
