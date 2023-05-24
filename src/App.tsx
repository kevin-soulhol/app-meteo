import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './styles/app.css';
import WeatherIndication from './components/WeatherIndications';




interface IWeatherDay {
  morning: string;
  afternoon: string;
}

interface IWeatherCodeDay {
  morning: number;
  afternoon: number;
}

const morningRange = { start : 9, end : 13 }
const afternoonRange = { start : 14, end : 18 }


function App() {  
  
  const [weatherDay, setWeatherDay] = useState<IWeatherDay>()
  const [weatherCodeDay, setWeatherCodeDay] = useState<IWeatherCodeDay>()
  const [tomorrow, setTomorrow] = useState<boolean>(true)

  let baseUrl =  'https://api.open-meteo.com/v1/meteofrance?&hourly=temperature_2m,weathercode'
  const latitude = 43.60
  const longitude = 1.44

  const fetchWeather = () => {

    fetch(_parseUrl()).then(response => response.json()).then(data => {
      let tempDay = parseTemp(data)
      let weatherCodeDay = parseWeather(data)
      setWeatherDay(tempDay);
      setWeatherCodeDay(weatherCodeDay)
      console.log(data, weatherCodeDay)
    })
  }

  const parseTemp = (data : any) => {

    let morningMoyenne = 0
    let afternoonMoyenne = 0

    if(data && data.hourly){

      let morningTemp = data.hourly.temperature_2m.slice(morningRange.start, morningRange.end)
      let afternoonTemp = data.hourly.temperature_2m.slice(afternoonRange.start, afternoonRange.end)

      morningMoyenne = getMoyenneTemp(morningTemp)
      afternoonMoyenne = getMoyenneTemp(afternoonTemp)

    }

    return {
      morning : new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 2, style : 'unit', unit : 'celsius' }).format(morningMoyenne),
      afternoon : new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 2, style : 'unit', unit : 'celsius' }).format(afternoonMoyenne) 
    }

  }

  const parseWeather = (data : any) => {

    let morning = 0
    let afternoon = 0

    if(data.hourly.weatherCode){
      morning = getMoyenneWeatherCode(data.hourly.weatherCode.slice(morningRange.start, morningRange.end))
      afternoon = getMoyenneWeatherCode(data.hourly.weatherCode.slice(afternoonRange.start, afternoonRange.end))
    }

    return {
      morning : morning,
      afternoon : afternoon
    }
  }

  const getMoyenneTemp = (arr : number[]) => {
    return arr.reduce((acc : number , curr : number) => acc + curr, 0)/arr.length;
  }

  const getMoyenneWeatherCode = (arr : number[]) => {
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop() ?? 0;
}

  const toggleTomorrow = () => {
    setTomorrow(!tomorrow)
  }

  const _parseUrl = () => {
    let day = new Date()
    if(tomorrow){
      day.setDate(day.getDate() + 1)
    }


    let date = day.getDay()
    let stringDay = date<10 ? `0${date}` : `${date}`
    let month = day. getMonth()
    let stringMonth = month<10 ? `0${month}` : `${month}`
    let year = day.getFullYear()

    let url = `${baseUrl}&latitude=${latitude}&longitude=${longitude}`
     url = `${url}&start_date=${year}-${stringMonth}-${stringDay}`
     url = `${url}&end_date=${year}-${stringMonth}-${stringDay}`

     return url;
  }


  useEffect(() => {
    fetchWeather()
  }, [tomorrow])

  return (
    <div className="App">

      <WeatherIndication morning={true} temp={weatherDay?.morning} weatherCode={weatherCodeDay?.morning} />
      <WeatherIndication morning={false} temp={weatherDay?.afternoon} weatherCode={weatherCodeDay?.afternoon} />
      

      <button onClick={toggleTomorrow}>{tomorrow ? 'Today' : 'Demain'}</button>
    
    </div>
  );
}

export default App;