import { createReducer } from '@reduxjs/toolkit'
import {
  setSelectedSeason,
  setSelectedEpisode,
  setSelectedPlayer,
  setSelectedTribe,
  setSelectedAdvantage
} from '../actions/seasons'

interface SeasonsState {
  selectedSeason: number
  selectedEpisode?: number
  selectedPlayer?: number
  selectedTribe?: number
  selectedAdvantage?: number
}

const initialState: SeasonsState = {
  selectedSeason: 0,
  selectedEpisode: 0,
  selectedPlayer: 0,
  selectedTribe: 0,
  selectedAdvantage: 0
}

const seasonsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSelectedSeason, (state, action) => {
    state.selectedSeason = 0
    const newSelectedSeason = Number(action.payload)
    if (!isNaN(newSelectedSeason)) state.selectedSeason = newSelectedSeason
  })

  builder.addCase(setSelectedEpisode, (state, action) => {
    state.selectedEpisode = 0
    const newSelectedEpisode = Number(action.payload)
    if (!isNaN(newSelectedEpisode)) state.selectedEpisode = newSelectedEpisode
  })

  builder.addCase(setSelectedPlayer, (state, action) => {
    state.selectedPlayer = 0
    const newSelectedPlayer = Number(action.payload)
    if (!isNaN(newSelectedPlayer)) state.selectedPlayer = newSelectedPlayer
  })

  builder.addCase(setSelectedTribe, (state, action) => {
    state.selectedTribe = 0
    const newSelectedTribe = Number(action.payload)
    if (!isNaN(newSelectedTribe)) state.selectedTribe = newSelectedTribe
  })

  builder.addCase(setSelectedAdvantage, (state, action) => {
    state.selectedAdvantage = 0
    const newSelectedAdvantage = Number(action.payload)
    if (!isNaN(newSelectedAdvantage))
      state.selectedAdvantage = newSelectedAdvantage
  })
})

export default seasonsReducer
