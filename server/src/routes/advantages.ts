import express from "express"
import advantageController from "../controllers/advantages"
const router = express.Router()

router.get("/", advantageController.getAdvantages)
router.get("/:id", advantageController.getAdvantage)
router.put("/:id", advantageController.updateAdvantage)
router.delete("/:id", advantageController.deleteAdvantage)
router.post("/", advantageController.addAdvantage)

export = router
