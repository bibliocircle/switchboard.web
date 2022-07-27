import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const user = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null
  },
  reducers: {
    loginCompleted(state, { payload }) {
      try {
        state.loggedInUser = jwtDecode(payload)
      } catch {}
    },
  }
})

export const LOGGED_IN_USER_SELECTOR = state => state.user.loggedInUser
export const { loginCompleted } = user.actions
export default user.reducer