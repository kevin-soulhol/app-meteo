import React, { useEffect, useState } from 'react';
import './styles/app.css';
import './styles/weather-icons.css';
import WeatherIndication from './components/WeatherIndications';
import ChartTemp from './components/ChartTemp';




interface IWeatherDay {
  morning: string;
  afternoon: string;
}

interface IWeatherCodeDay {
  morning: number;
  afternoon: number;
}

const morningRange = { start : 8, end : 13 }
const afternoonRange = { start : 14, end : 22 }


function App() {  
  
  const [weatherDay, setWeatherDay] = useState<IWeatherDay>()
  const [weatherCodeDay, setWeatherCodeDay] = useState<IWeatherCodeDay>()
  const [data, setData] = useState<any>()
  const [tomorrow, setTomorrow] = useState<boolean>(true)

  let baseUrl =  'https://api.open-meteo.com/v1/meteofrance?&hourly=temperature_2m,weathercode'
  const latitude = 43.60
  const longitude = 1.43333

  const fetchWeather = () => {

    fetch(_parseUrl()).then(response => response.json()).then(data => {
      let tempDay = parseTemp(data)
      let weatherCodeDay = parseWeather(data)
      setWeatherDay(tempDay);
      setWeatherCodeDay(weatherCodeDay)
      setData(data)
      console.log(data)
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
      morning : new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 3, style : 'unit', unit : 'celsius' }).format(morningMoyenne),
      afternoon : new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 3, style : 'unit', unit : 'celsius' }).format(afternoonMoyenne) 
    }

  }

  const parseWeather = (data : any) => {

    let morning = 0
    let afternoon = 0

    if(data.hourly.weathercode){
      morning = getMoyenneWeatherCode(data.hourly.weathercode.slice(morningRange.start, morningRange.end))
      afternoon = getMoyenneWeatherCode(data.hourly.weathercode.slice(afternoonRange.start, afternoonRange.end))
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
    arr = arr.filter(code => code != 0)
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop() ?? 0;
}

  const _parseUrl = () => {
    let day = new Date()
    if(tomorrow){
      day.setDate(day.getDate() + 1)
    }


    let date = day.getDate()
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



      <div className="contains-buttons">
        <button data-selected={!tomorrow} onClick={() => setTomorrow(false)}>Aujourd'hui</button>
        <button data-selected={tomorrow} onClick={() => setTomorrow(true)}>Demain</button>
      </div>

      <ChartTemp label={data?.hourly?.time?.slice(morningRange.start, afternoonRange.end)} temperature={data?.hourly?.temperature_2m} />
    
    <div className="contain-Indications">
      <WeatherIndication morning={true} temp={weatherDay?.morning} weatherCode={weatherCodeDay?.morning} />
      <WeatherIndication morning={false} temp={weatherDay?.afternoon} weatherCode={weatherCodeDay?.afternoon} />
    </div>
    
    </div>
  );
}

export default App;