import { configureStore } from '@reduxjs/toolkit'
import userinfoslics from './slices/UserinfoSlies'

export const store = configureStore({
  reducer: {
    userinfo: userinfoslics
  }
})