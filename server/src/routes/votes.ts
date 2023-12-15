import express from 'express'
import voteController from '../controllers/votes'
const router = express.Router()

router.put('/:id', voteController.updateVote)

export = router
