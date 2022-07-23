import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user'
import application from './slices/application'

export default configureStore({
  reducer: {
    user,
    application
  }
})