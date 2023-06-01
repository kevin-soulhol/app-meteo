import { useEffect, useState } from "react"

const useGetWeather = (  tomorrow :  boolean ) => {
    const [currentDate, setCurrentDate] = useState<Date>()
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)

    const baseUrl = 'https://api.open-meteo.com/v1/'
    const weatherModel = 'meteofrance'
    const hourly = ['temperature_2m', 'weathercode', 'apparent_temperature'];
    const daily = ['temperature_2m_max', 'apparent_temperature_max'];
    const latitude = 43.60
    const longitude = 1.43333

    const get = (date : Date) =>{
        if(!date){
            return {}
        }

        let url = `${baseUrl}${weatherModel}?`
        url += `&longitude=${longitude}&latitude=${latitude}`
        url += `&timezone=GMT`
    
        if(hourly){
            url += `&hourly=${hourly.join(',')}`
        }
    
        if(daily){
            url += `&daily=${daily.join(',')}`
        }
        
        url += `&start_date=${getStringDate(date)}`
        url += `&end_date=${getStringDate(date)}`
    
        fetch(url).then(response => response.json()).then(data => {
            console.log(data)
            setData(data)
            setLoading(false)
        })
    }

    const getStringDate = (date : Date) => {
        let stringDay = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
        let month = date. getMonth()+1
        let stringMonth = month < 10 ? `0${month}` : `${month}`
        let stringYear = date.getFullYear()

        return `${stringYear}-${stringMonth}-${stringDay}`
    }

    useEffect(() => {
        setLoading(true)
        let date = new Date()
        if(tomorrow){
            date.setDate(date.getDate() + 1)
        }
        setCurrentDate(date)
    }, [tomorrow])

    useEffect(() => {
        if(currentDate){
            get(currentDate)
        }
    }, [currentDate])


    return [currentDate, loading, data, latitude, longitude]
}

export default useGetWeather;