import express from "express"
import episodeController from "../controllers/episodes"
import playerInEpisodeController from "../controllers/playersInEpisode"
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

export = router
