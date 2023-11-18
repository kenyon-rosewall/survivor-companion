import { createReducer } from "@reduxjs/toolkit"
import { setSelectedSeason } from "../actions/seasons"

interface SeasonsState {
  selectedSeason: number
}

const initialState: SeasonsState = {
  selectedSeason: 0,
}

const seasonsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSelectedSeason, (state, action) => {
    state.selectedSeason = 0
    const newSelectedSeason = Number(action.payload)
    if (!isNaN(newSelectedSeason)) state.selectedSeason = newSelectedSeason
  })
})

export default seasonsReducer
