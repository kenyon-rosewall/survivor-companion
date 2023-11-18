import express from 'express';
import controller from '../controllers/episodes';
const router = express.Router();

router.get('/', controller.getEpisodes);
router.get('/:id', controller.getEpisode);
router.put('/:id', controller.updateEpisode);
router.delete('/:id', controller.deleteEpisode);

export = router;
