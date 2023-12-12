import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan'
import * as fuseCache from './modules/fuseCache'

import seasons from './routes/seasons'
import episodes from './routes/episodes'
import players from './routes/players'
import tribes from './routes/tribes'
import playerInEpisodes from './routes/playerInEpisodes'
import advantages from './routes/advantages'
import tribalCouncils from './routes/tribalCouncils'
import eliminations from './routes/eliminations'
import advantageEvents from './routes/advantageEvents'
import alliances from './routes/alliances'

const router: Express = express()

router.use(morgan('dev'))
router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PUT DELETE POST')
    return res.status(200).json({})
  }
  next()
})

router.use('/seasons', seasons)
router.use('/episodes', episodes)
router.use('/players', players)
router.use('/tribes', tribes)
router.use('/playerInEpisodes', playerInEpisodes)
router.use('/advantages', advantages)
router.use('/tribalCouncils', tribalCouncils)
router.use('/eliminations', eliminations)
router.use('/advantageEvents', advantageEvents)
router.use('/alliances', alliances)

router.use((req, res) => {
  return res.status(404).json({
    message: `Not found`
  })
})

const server = http.createServer(router)
const PORT: any = process.env.PORT || 5000
fuseCache.updatePlayerCache()

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
