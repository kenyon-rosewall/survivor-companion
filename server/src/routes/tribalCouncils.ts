import express from "express"
import tribalCouncilController from "../controllers/tribalCouncils"
import voteController from "../controllers/votes"
const router = express.Router()

router.get("/:id", tribalCouncilController.getTribalCouncil)
router.put("/:id", tribalCouncilController.updateTribalCouncil)
router.delete("/:id", tribalCouncilController.deleteTribalCouncil)
router.get(
  "/:tribalCouncilId/players",
  tribalCouncilController.getPlayersFromTribalCouncil
)

router.post(
  "/:tribalCouncilId/tribes/:tribeId",
  tribalCouncilController.addTribe
)
router.delete(
  "/:tribalCouncilId/tribes/:tribeId",
  tribalCouncilController.deleteTribe
)

router.get("/:tribalCouncilId/votes", voteController.getVotesFromTribalCouncil)
router.delete("/:tribalCouncilId/votes/:voteId", voteController.deleteVote)
router.post("/:tribalCouncilId/votes", voteController.addVote)

export = router
