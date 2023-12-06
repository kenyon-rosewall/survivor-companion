import express from "express"
import controller from "../controllers/players"
const router = express.Router()

router.get("/", controller.getPlayers)
router.get("/:id", controller.getPlayer)
router.put("/:id", controller.updatePlayer)
router.delete("/:id", controller.deletePlayer)
router.post("/", controller.addPlayer)

router.get("/search/:q", controller.searchPlayers)
router.get("/season/:seasonId/search/:q", controller.searchPlayers)

export = router
