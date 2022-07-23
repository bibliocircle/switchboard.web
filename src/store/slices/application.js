import { createSlice } from '@reduxjs/toolkit'

const application = createSlice({
  name: 'application',
  initialState: {},
  reducers: {
    setCurrentSection(state, { payload }) {
      state.currentSection = payload
    },
  }
})

export const { setCurrentSection } = application.actions
export default application.reducer