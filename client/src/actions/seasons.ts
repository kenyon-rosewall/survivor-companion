import { createAction } from "@reduxjs/toolkit"

export const setSelectedSeason = createAction<number>("seasons/setSelected")
export const setSelectedEpisode = createAction<number>("seasons/setEpisode")
export const setSelectedPlayer = createAction<number>("seasons/setPlayer")
export const setSelectedTribe = createAction<number>("seasons/setTribe")
export const setSelectedAdvantage = createAction<number>("seasons/setAdvantage")
