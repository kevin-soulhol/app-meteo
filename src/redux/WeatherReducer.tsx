import { createSlice } from '@reduxjs/toolkit'
import { AllowedWeather, IWeekWeather } from '../utils/useGetWeather';
import { ISanitizedData } from '../utils/useGetWeather';

export interface IWeatherService {
    city: string;
    temperature: string;
    isLoading: boolean;
    tomorrow: boolean;
    location?: ILocation;
    weather: AllowedWeather;
    weekVisible: boolean;
    detailsVisible: boolean;
    searchbarVisible: boolean;
    dataToday?: ISanitizedData;
    dataTomorrow?: ISanitizedData;
    dataWeek?: IWeekWeather[];
}

export interface ILocation {
    latitude : number;
    longitude : number;
    label?: string;
}

const initialState : IWeatherService = {
    city: 'Toulouse',
    temperature: `20`,
    isLoading: false,
    tomorrow: sessionStorage.getItem('tomorrow') === 'false' ? false : true,
    weather: 'sun',
    weekVisible: sessionStorage.getItem('weekVisible') === 'true' || false,
    detailsVisible: sessionStorage.getItem('detailsVisible') === 'true' || false,
    searchbarVisible: true
}


const WeatherSlice = createSlice({
    name: 'weather',
    initialState : initialState,
    reducers: {
        toggleTomorrow: (state ) => {
            state.tomorrow = !state.tomorrow
            sessionStorage.setItem('tomorrow', JSON.stringify(state.tomorrow))
        },
        toggleWeekVisible: (state ) => {
            state.weekVisible = !state.weekVisible
            sessionStorage.setItem('weekVisible', JSON.stringify(state.weekVisible))
        },
        toggleDetailsVisible: (state ) => {
            state.detailsVisible = !state.detailsVisible
            sessionStorage.setItem('detailsVisible', JSON.stringify(state.detailsVisible))
        },
        toggleSearchbarVisible: (state ) => {
            state.searchbarVisible = !state.searchbarVisible
        },
        setDataToday: (state, action ) => {
            state.dataToday = action.payload
        },
        setDataTomorrow: (state, action ) => {
            state.dataTomorrow = action.payload
        },
        setDataWeek: (state, action ) => {
            state.dataWeek = action.payload
        },
    },
})

export const { toggleTomorrow, toggleWeekVisible, toggleDetailsVisible,  setDataToday, setDataTomorrow, setDataWeek, toggleSearchbarVisible } = WeatherSlice.actions

export const weatherService = (state : any) => state.weather as IWeatherService


export default WeatherSlice.reducer