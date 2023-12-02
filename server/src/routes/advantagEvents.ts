import express from "express"
import advantageEventController from "../controllers/advantageEvents"
const router = express.Router()

router.get("/:id", advantageEventController.getAdvantageEvent)
router.put("/:id", advantageEventController.updateAdvantageEvent)
router.delete("/:id", advantageEventController.deleteAdvantageEvent)

export = router
