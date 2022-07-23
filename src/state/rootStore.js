import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './index'

export const store = configureStore({
  reducer: {
    gameReducer,
  },
})
