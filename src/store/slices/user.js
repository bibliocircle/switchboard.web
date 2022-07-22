import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    loginCompleted(state, action) {
      state.name = action.payload.name
    }
  }
})

export const { loginCompleted } = user.actions
export default user.reducer