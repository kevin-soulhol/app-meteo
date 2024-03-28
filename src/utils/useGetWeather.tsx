import { useEffect, useState } from "react"

import ILocation from "../types/Location"
import { parse } from "@fortawesome/fontawesome-svg-core"

export type AllowedWeather = 'sun' | 'cloudy' | 'fog' | 'haze' | 'rain' | 'snow' | 'wind' | 'showers' | 'stormShowers' | 'thunderstorm' | 'sleet'| 'rainMix' | 'hail'

export interface IWeekWeather {
    temperature: number,
    weatherCode: number,
    weatherString: AllowedWeather,
    date: string
}

export interface ISanitizedData {
    weatherCodeDay: number,
    weatherStringDay: AllowedWeather,
    temperatureDay: number,
    humidityDay: number,
    windDay: number,
    precipitationDay: number,
    sunrise: string,
    sunset: string,
    tempInRangeDay: number[],
    codeInRangeDay: number[],
    translateCodeInRangeDay: AllowedWeather[],
    longitude: number,
    latitude: number,
    rangeHoursLabel: string[],
    rangeWeekTemperature: number[],
    rangeWeekTranslateWeatherCode : AllowedWeather[],
    rangeWeekDay : string[],
    weeks: IWeekWeather[]
}

export interface IinCorrespondance {
    [key: string]: AllowedWeather;
}
interface ICorrespondance {
    [key: number]: IinCorrespondance;
}

const correspondance: ICorrespondance = {
    0:  //Haze, dust, sand or smoke
    {
        low: 'sun',
        medium: 'cloudy',
        hard: 'cloudy',
    },
    1:
    {
        low: 'wind',
        medium: 'haze',
        hard: 'fog'
    },
    2:  //Precipitation, fog, ice fog or thunderstorm at the station during the preceding hour but not at the time of observation 
    {
        low: 'rain',
        medium: 'hail',
        hard: 'rain',
        thunder: 'thunderstorm'
    },
    3: //Duststorm, sandstorm, drifting or blowing snow 
    {
        low: 'wind',
        medium: 'wind',
        hard: 'wind'
    },
    4: //Fog or ice fog at the time of observation 
    {
        low: 'fog',
        medium: 'fog',
        hard: 'fog',
    },
    5: //Drizzle
    {
        low: 'sleet',
        medium: 'sleet',
        hard: 'sleet',
    },
    6: //Rain
    {
        low: 'rain',
        medium: 'rain',
        hard: 'rain',
    },
    7: //Solid precipitation not in showers 
    {
        low: 'rainMix',
        medium: 'rainMix',
        hard: 'rainMix',
    },
    8:  //Showery precipitation, or precipitation with current or recent thunder storm 
    {
        low: 'showers',
        medium: 'snow',
        hard: 'stormShowers',
    },
    9:  //Showery precipitation, or precipitation with current or recent thunder storm 
    {
        low: 'stormShowers',
        medium: 'stormShowers',
        hard: 'thunderstorm',
    },
}

const morningRange = { start: 8, end: 12 }
const afternoonRange = { start: 13, end: 20 }

const baseUrl = 'https://api.open-meteo.com/v1/'
const weatherModel = 'meteofrance'
const hourly = ['temperature_100m', 'weathercode', 'apparent_temperature', 'relative_humidity_2m', 'wind_speed_10m'];
const daily = ['temperature_2m_max', 'apparent_temperature_max', 'precipitation_sum', 'sunrise', 
'sunset', 'wind_speed_10m_max'];

const weekDayNumber = 8

const useGetWeather = (location: ILocation) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [dataToday, setDataToday] = useState<ISanitizedData | null>(null)
    const [dataTomorrow, setDataTomorrow] = useState<ISanitizedData | null>(null)

    useEffect(() => {
        getData()
    }, [location])

    const getData = async () => {
        setLoading(true)
        const today = new Date()
        const date = new Date()
        const tomorrow = new Date( date.setDate(date.getDate() + 1) );

        const dataToday = await get(today)
        const dataTomorrow = await get(tomorrow)
        const dataWeek = await getWeek()

        const sanitizedDataToday = _sanitizeData( dataToday, dataWeek )
        const sanitizedDataTomorrow = _sanitizeData( dataTomorrow, dataWeek.slice(1) )


        setDataToday(sanitizedDataToday, )
        setDataTomorrow(sanitizedDataTomorrow)
        console.log(sanitizedDataToday)
        setLoading(false)
    }

    const get = async (date: Date, onLongTime = false ) => {
        if (!date) {
            return {}
        }

        let _weatherModel = weatherModel

        if(onLongTime){
            _weatherModel = 'ecmwf'
        }

        let url = `${baseUrl}${_weatherModel}?`
        url += `&longitude=${location.longitude}&latitude=${location.latitude}`
        url += `&timezone=GMT`

        if (hourly) {
            url += `&hourly=${hourly.join(',')}`
        }

        if (daily) {
            url += `&daily=${daily.join(',')}`
        }

        url += `&start_date=${_getStringDate(date)}`
        url += `&end_date=${_getStringDate(date)}`


        return fetch(url).then(response => response.json()).then(data => {
            return data
        })

    }

    const getWeek = async () => {
        const res : IWeekWeather[] = []
        const arr = new Array(weekDayNumber).fill(0).map((_, index) => index + 1)
        for (const day in arr){
            const dayDate = parseInt(day)
            const today = new Date()
            let date = new Date( today.setDate(today.getDate() + dayDate) );
            const data =  await get(date, true)
            res.push({
                temperature: _getTemperatureDay(data),
                weatherCode: _getWeatherCodeDay(data),
                weatherString: _codeToString(_getWeatherCodeDay(data)),
                date: _getStringDate(date)
            } as IWeekWeather)
        }
        return res as IWeekWeather[]
    }

    const _sanitizeData = (data: any, dataWeek : IWeekWeather []) => {

        const code = _getWeatherCodeDay(data)

       return  {
        weatherCodeDay: code,
        weatherStringDay: _codeToString(code),
        temperatureDay: _getTemperatureDay(data),
        humidityDay: _getHumidity(data),
        windDay: _getWind(data),
        precipitationDay: _getPrecipitation(data),
        sunrise: _getSunrise(data),
        sunset: _getSunset(data),
        tempInRangeDay: _getTempInRangeDay(data),
        codeInRangeDay: _getCodeInRangeDay(data),
        translateCodeInRangeDay: _getTranslateCodeInRangeDay(data),
        longitude: location.longitude,
        latitude: location.latitude,
        rangeHoursLabel: _getOnRange(data.hourly.time),
        rangeWeekTemperature: dataWeek.map((day) => day.temperature),
        rangeWeekTranslateWeatherCode: dataWeek.map((day) => day.weatherString),
        rangeWeekDay: dataWeek.map((day) => day.date),
       } as ISanitizedData
    }

    const _getTempInRangeDay = (data: any) => {
        return _getOnRange(data.hourly.temperature_100m) as number[]
    }

    const _getCodeInRangeDay = (data: any) => {
        return data.hourly.weathercode as number[]
    }

    const _getTemperatureDay = (data: any) => {
        const moyenne = _getMoyenne(data.hourly?.temperature_100m || data.hourly.apparent_temperature, 1)
        return Math.round(moyenne * 10) / 10 as number
    }

    const _getSunset = (data: any) => {
        return data.daily.sunset as string
    }

    const _getSunrise = (data: any) => {
        return data.daily.sunrise as string
    }

    const _getPrecipitation = (data: any) => {
        return data.daily.precipitation_sum[0] as number
    }

    const _getWind = (data: any) => {
        return data.daily.wind_speed_10m_max[0] as number
    }

    const _getHumidity = (data: any) => {
        return _getMoyenne(data.hourly.relative_humidity_2m, 0) as number
    }

    const _getWeatherCodeDay = (data: any) => {
        return _getMain(_getOnRange(data.hourly.weathercode)) as number
    }

    const _getTranslateCodeInRangeDay = (data: any) => {
        return _getOnRange(_getCodeInRangeDay(data)).map((code: number) => _codeToString(code)) as AllowedWeather[]
    }


    
    const _getStringDate = (date: Date) => {
        let stringDay = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
        let month = date.getMonth() + 1
        let stringMonth = month < 10 ? `0${month}` : `${month}`
        let stringYear = date.getFullYear()

        return `${stringYear}-${stringMonth}-${stringDay}`
    }

    const _getOnRange = (data: any) => {
        return data.slice(morningRange.start, afternoonRange.end)
    }

    const _getMoyenne = (data: any, digit = 2) => {
        let multiplicateur = Math.pow(10, digit)
        let moyenne = _getOnRange(data)
        moyenne = moyenne.reduce((acc: number, curr: number) => acc + curr, 0) / (afternoonRange.end - morningRange.start)
        return Math.round(moyenne * multiplicateur) / multiplicateur
    }

    const _getMain = (arr: any[]) => { 
            
        // Sort the array 
        arr.sort(); 
            
        // find the max frequency using linear 
        // traversal 
        let max_count = 1, res = arr[0]; 
        let curr_count = 1; 
            
        for (let i = 1; i < arr.length; i++) 
        { 
            if (arr[i] == arr[i - 1]) 
                curr_count++; 
            else
                curr_count = 1; 
             
            if (curr_count > max_count) 
            { 
                max_count = curr_count; 
                res = arr[i - 1]; 
            } 
  
        } 
          
        return res; 
    }

    const _codeToString = (code : number) => {
        let cpCode = `${code}`
        if (code < 10) {
            cpCode = `0${code}`
        }
        let arrCode = `${cpCode}`.split('')

        let firstCode = parseInt(arrCode[0])
        let secondCode = parseInt(arrCode[1])
        let force = null
        if (secondCode <= 2) {
            force = 'low'
        } else if (secondCode < 7) {
            force = 'medium'
        } else {
            force = 'hard'
        }

        return `${correspondance[firstCode][force]}` as AllowedWeather
    }


    return [loading, dataToday, dataTomorrow]
}

export default useGetWeather;