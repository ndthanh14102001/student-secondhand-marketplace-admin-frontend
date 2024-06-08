// types
import { createSlice } from '@reduxjs/toolkit'

// initial state
const initialState = {}

// ==============================|| SLICE - MENU ||============================== //

const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action) {
      state = action.payload.user
      return state
    },

    logout(state) {
      state = initialState
      return state
    },
  },
})

export default loginReducer.reducer

export const { logout, login } = loginReducer.actions
