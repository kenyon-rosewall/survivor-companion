import express from "express"
import controller from "../controllers/tribes"
const router = express.Router()

router.get("/", controller.getTribes)
router.get("/:id", controller.getTribe)
router.put("/:id", controller.updateTribe)
router.delete("/:id", controller.deleteTribe)

export = router
