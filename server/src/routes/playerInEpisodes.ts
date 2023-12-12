import express from "express"
import playerInEpisodeController from "../controllers/playersInEpisode"
const router = express.Router()

router.get("/:id", playerInEpisodeController.getPlayerInEpisode)
router.put("/:id", playerInEpisodeController.updatePlayerInEpisode)

export = router
