import { configureStore } from '@reduxjs/toolkit'
import WeatherReducer from './redux/WeatherReducer'

export const store = configureStore({
  reducer: {
    weather: WeatherReducer
  }
})