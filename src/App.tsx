import { useEffect, useState } from 'react';
import './styles/app.scss';
import WeatherIndication from './components/WeatherIndications';
import ChartTemp from './components/ChartTemp';
import WeatherIcon from './components/WeatherIcon';
import ToggleButton from './components/ToogleButton';
import MoonIndications from './components/MoonIndications';




interface IWeatherDay {
  morning: string;
  afternoon: string;
  day:string;
}

interface IWeatherCodeDay {
  morning: number;
  afternoon: number;
  day:number;
}

const morningRange = { start : 8, end : 12 }
const afternoonRange = { start : 13, end : 20 }


function App() {  
  
  const [tempDay, setTempDay] = useState<IWeatherDay>()
  const [weatherCodeDay, setWeatherCodeDay] = useState<IWeatherCodeDay>()
  const [data, setData] = useState<any>()
  const [date, setDate] = useState<Date>()
  const [tomorrow, setTomorrow] = useState<boolean>(true)

  let baseUrl =  'https://api.open-meteo.com/v1/meteofrance?&hourly=temperature_2m,weathercode,apparent_temperature'
  const latitude = 43.60
  const longitude = 1.43333

  const fetchWeather = () => {

    fetch(_parseUrl()).then(response => response.json()).then(data => {
      let tempDay = parseTemp(data)
      let weatherCodeDay = parseWeather(data)
      setTempDay(tempDay);
      setWeatherCodeDay(weatherCodeDay)
      setData(data)
    })
  }

  const parseTemp = (data : any) => {
    let wichTemp = 'apparent_temperature'
    let morningMoyenne = 0
    let afternoonMoyenne = 0
    let dayMoyenne = 0

    if(data && data.hourly){

      morningMoyenne = getMoyenneTemp(data.hourly[wichTemp].slice(morningRange.start, morningRange.end))
      afternoonMoyenne = getMoyenneTemp(data.hourly[wichTemp].slice(afternoonRange.start, afternoonRange.end))
      dayMoyenne = getMoyenneTemp(data.hourly[wichTemp].slice(morningRange.start, afternoonRange.end))

    }

    return {
      morning : new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 3 }).format(morningMoyenne),
      afternoon : new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 3 }).format(afternoonMoyenne),
      day : new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 3 }).format(dayMoyenne),
    }

  }

  const getMoyenneWeatherCode = (arr : number[]) => {
    arr = arr.filter(code => code != 0)
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop() ?? 0;
}

  const parseWeather = (data : any) => {
    return {
      morning : getMoyenneWeatherCode(data.hourly.weathercode.slice(morningRange.start, morningRange.end)),
      afternoon : getMoyenneWeatherCode(data.hourly.weathercode.slice(afternoonRange.start, afternoonRange.end)),
      day : getMoyenneWeatherCode(data.hourly.weathercode.slice(morningRange.start, afternoonRange.end))
    }
  }

  const getMoyenneTemp = (arr : number[]) => {
    return arr.reduce((acc : number , curr : number) => acc + curr, 0)/arr.length;
  }



  const _parseUrl = () => {
    let day = new Date()
    if(tomorrow){
      day.setDate(day.getDate() + 1)
    }
    setDate(day)


    let date = day.getDate()
    let stringDay = date<10 ? `0${date}` : `${date}`
    let month = day. getMonth()+1
    let stringMonth = month<10 ? `0${month}` : `${month}`
    let year = day.getFullYear()

    let url = `${baseUrl}&latitude=${latitude}&longitude=${longitude}`
     url = `${url}&start_date=${year}-${stringMonth}-${stringDay}`
     url = `${url}&end_date=${year}-${stringMonth}-${stringDay}`
     url = `${url}&timezone=GMT`
     url = `${url}&daily=temperature_2m_max,apparent_temperature_max`
     return url;
  }


  useEffect(() => {
    fetchWeather()
  }, [tomorrow])

  return (
    <div className="App">

      <header>
        {date?.getDate()}
        <ToggleButton selected={tomorrow ? 2 : 1} onClick={() => setTomorrow(!tomorrow)} />
      </header>

      <div className="centerElements">
        <div className="mainIcon"><WeatherIcon code={weatherCodeDay?.day ?? 0} /></div>
        <div className="currentTemp">{tempDay?.day}°</div>
       

        <WeatherIndication morning={true} temp={tempDay?.morning} weatherCode={weatherCodeDay?.morning} />
        <WeatherIndication morning={false} temp={tempDay?.afternoon} weatherCode={weatherCodeDay?.afternoon} />
        
      </div>

      <div className="moonBloc">
          <MoonIndications date={date} latitude={latitude} longitude={longitude} />
      </div>

      <div className="footer">
        <ChartTemp label={data?.hourly?.time?.slice(morningRange.start, afternoonRange.end)} temperature={data?.hourly?.apparent_temperature} />
      </div>
    
    </div>
  );
}

export default App;