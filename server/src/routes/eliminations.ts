import express from "express"
import eliminationController from "../controllers/eliminations"
const router = express.Router()

router.get("/:id", eliminationController.getElimination)
router.put("/:id", eliminationController.updateElimination)
router.delete("/:id", eliminationController.deleteElimination)

export = router
