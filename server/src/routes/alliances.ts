import express from 'express'
import allianceController from '../controllers/alliances'
const router = express.Router()

router.get('/:id', allianceController.getAlliance)
router.put('/:id', allianceController.updateAlliance)
router.delete('/:id', allianceController.deleteAlliance)

router.post('/:id/players', allianceController.addPlayer)
router.delete('/:id/players/:playerId', allianceController.deletePlayer)

export = router
