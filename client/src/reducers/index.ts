import { combineReducers } from 'redux'
import seasonsReducer from './seasons'
import menuReducer from './menu'

const rootReducer = combineReducers({
  season: seasonsReducer,
  menu: menuReducer
})

export default rootReducer
