import express from "express"
import tribalCouncilController from "../controllers/tribalCouncils"
import voteController from "../controllers/votes"
const router = express.Router()

router.get("/:id", tribalCouncilController.getTribalCouncil)
router.put("/:id", tribalCouncilController.updateTribalCouncil)
router.delete("/:id", tribalCouncilController.deleteTribalCouncil)

router.post(
  "/:tribalCouncilId/tribes/:tribeId",
  tribalCouncilController.addTribe
)
router.delete(
  "/:tribalCouncilId/tribes/:tribeId",
  tribalCouncilController.deleteTribe
)

router.get("/:tribalCouncilId/votes", voteController.getVotesFromTribalCouncil)
router.delete("/:tribalCouncilId/votes/:voterId", voteController.deleteVote)
router.post("/:tribalCouncilId/votes", voteController.addVote)

export = router
