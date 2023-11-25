import { createAction } from "@reduxjs/toolkit"

export const setSelectedSeason = createAction<number>("seasons/setSelected")
export const setSelectedEpisode = createAction<number>("seasons/setEpisode")
