import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const user = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null
  },
  reducers: {
    loginCompleted(state, { payload }) {
      state.loggedInUser = jwtDecode(payload)
    },
  }
})

export const { loginCompleted } = user.actions
export default user.reducer