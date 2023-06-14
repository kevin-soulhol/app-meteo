import { useEffect, useState } from "react"

import ILocation from "../types/Location"
import IWeatherDay from "../types/WeatherDay"
import IWeatherCodeDay from "../types/WeatherCodeDay"

const morningRange = { start: 8, end: 12 }
const afternoonRange = { start: 13, end: 20 }


const useGetWeather = (tomorrow: boolean, location: ILocation) => {
    const [currentDate, setCurrentDate] = useState<Date>()
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [tempDay, setTempDay] = useState<IWeatherDay>({
        morning: '0',
        afternoon: '0',
        day: '0'
    })
    const [weatherCodeDay, setWeatherCodeDay] = useState<IWeatherCodeDay>({
        morning: 0,
        afternoon: 0,
        day: 0,
    })
    const [tempInRangeDay, setTempInRangeDay] = useState<number[]>([])
    const [codeInRangeDay, setCodeInRangeDay] = useState<number[]>([])




    const baseUrl = 'https://api.open-meteo.com/v1/'
    const weatherModel = 'meteofrance'
    const hourly = ['temperature_2m', 'weathercode', 'apparent_temperature'];
    const daily = ['temperature_2m_max', 'apparent_temperature_max'];

    const get = (date: Date) => {
        if (!date) {
            return {}
        }

        let url = `${baseUrl}${weatherModel}?`
        url += `&longitude=${location.longitude}&latitude=${location.latitude}`
        url += `&timezone=GMT`

        if (hourly) {
            url += `&hourly=${hourly.join(',')}`
        }

        if (daily) {
            url += `&daily=${daily.join(',')}`
        }

        url += `&start_date=${getStringDate(date)}`
        url += `&end_date=${getStringDate(date)}`


        fetch(url).then(response => response.json()).then(data => {
            console.log('ApiWeather', data, url)
            setData(data)
            setError(undefined)
            setLoading(false)
            setTempDay(parseTemp(data))
            setWeatherCodeDay(parseWeather(data))
            setTempInRangeDay(data?.hourly?.apparent_temperature?.slice(morningRange.start, afternoonRange.end))
            setCodeInRangeDay(data?.hourly?.weathercode?.slice(morningRange.start, afternoonRange.end))

        },
            (error) => {
                console.log(error.message)
                setError(`Une erreur est survenue en questionnant l'API`)
            }
        )

    }

    const getStringDate = (date: Date) => {
        let stringDay = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
        let month = date.getMonth() + 1
        let stringMonth = month < 10 ? `0${month}` : `${month}`
        let stringYear = date.getFullYear()

        return `${stringYear}-${stringMonth}-${stringDay}`
    }

    useEffect(() => {
        setLoading(true)
        let date = new Date()
        if (tomorrow) {
            date.setDate(date.getDate() + 1)
        }
        setCurrentDate(date)
    }, [tomorrow])

    useEffect(() => {
        if (currentDate) {
            get(currentDate)
        }
    }, [currentDate, location])


    const parseTemp = (data: any) => {
        let wichTemp = 'apparent_temperature'
        let morningMoyenne = 0
        let afternoonMoyenne = 0
        let dayMoyenne = 0

        if (data && data.hourly) {

            morningMoyenne = getMoyenneTemp(data.hourly[wichTemp].slice(morningRange.start, morningRange.end))
            afternoonMoyenne = getMoyenneTemp(data.hourly[wichTemp].slice(afternoonRange.start, afternoonRange.end))
            dayMoyenne = getMoyenneTemp(data.hourly[wichTemp].slice(morningRange.start, afternoonRange.end))

        }

        return {
            morning: new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 3 }).format(morningMoyenne),
            afternoon: new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 3 }).format(afternoonMoyenne),
            day: new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 3 }).format(dayMoyenne),
        }

    }

    const getMoyenneWeatherCode = (arr: number[]) => {
        arr = arr.filter(code => code != 0)
        return arr.sort((a, b) =>
            arr.filter(v => v === a).length
            - arr.filter(v => v === b).length
        ).pop() ?? 0;
    }

    const parseWeather = (data: any) => {
        return {
            morning: getMoyenneWeatherCode(data.hourly.weathercode.slice(morningRange.start, morningRange.end)),
            afternoon: getMoyenneWeatherCode(data.hourly.weathercode.slice(afternoonRange.start, afternoonRange.end)),
            day: getMoyenneWeatherCode(data.hourly.weathercode.slice(morningRange.start, afternoonRange.end))
        }
    }

    const getMoyenneTemp = (arr: number[]) => {
        return arr.reduce((acc: number, curr: number) => acc + curr, 0) / arr.length;
    }

    return [currentDate, loading, data, tempDay, weatherCodeDay, tempInRangeDay, codeInRangeDay, error]
}

export default useGetWeather;