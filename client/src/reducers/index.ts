import { combineReducers } from 'redux'
import seasonsReducer from './seasons'
import menuReducer from './menu'

const rootReducer = combineReducers({
  season: seasonsReducer,
  menu: menuReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
