import { createReducer } from "@reduxjs/toolkit"
import { setMenuItem } from "../actions/menu"

interface MenuState {
  selectedMenuItem: string
}

const initialState: MenuState = {
  selectedMenuItem: "seasonInfo",
}

const menuReducer = createReducer(initialState, (builder) => {
  builder.addCase(setMenuItem, (state, action) => {
    state.selectedMenuItem = "seasonInfo"
    if (action.payload !== "") state.selectedMenuItem = action.payload
  })
})

export default menuReducer
