import { useEffect, useState } from 'react';
import WeatherIndication from './components/WeatherIndications';
import ChartTemp from './components/ChartTemp';
import WeatherIcon from './components/WeatherIcon';
import ToggleButton from './components/ToogleButton';
import MoonIndications from './components/MoonIndications';
import DayVisibility from './components/DayVisibility';
import useGetWeather from './utils/useGetWeather';
import ErrorBloc from './components/ErrorBloc';



interface IWeatherDay {
  morning: string;
  afternoon: string;
  day: string;
}

interface IWeatherCodeDay {
  morning: number;
  afternoon: number;
  day: number;
}

const morningRange = { start : 8, end : 12 }
const afternoonRange = { start : 13, end : 20 }


function App() {  
  
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
  
  const [tomorrow, setTomorrow] = useState<boolean>(false)
  const [currentDate, loading, data, latitude, longitude, error] = useGetWeather(tomorrow);


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

  useEffect(() => {
    if(data){
      let tempDay = parseTemp(data)
      let weatherCodeDay = parseWeather(data)
      setTempDay(tempDay);
      setWeatherCodeDay(weatherCodeDay)
      setTempInRangeDay(data?.hourly?.apparent_temperature?.slice(morningRange.start, afternoonRange.end))
      setCodeInRangeDay(data?.hourly?.weathercode?.slice(morningRange.start, afternoonRange.end))
    }
  }, [data])

  return (
    <div className="App">
      <header>
        <div className="date">{new Intl.DateTimeFormat('fr-FR', { weekday: "long", month: "long", day: "numeric" }).format(currentDate)}</div>
        <ToggleButton selected={tomorrow ? 2 : 1} onClick={() => setTomorrow(!tomorrow)} />
      </header>

      <div className="centerElements">
        <div className="mainIcon"><WeatherIcon code={weatherCodeDay?.day ?? 0} /></div>
        <div className="currentTemp">{tempDay?.day}°</div>
      
        <WeatherIndication morning={true} temp={tempDay?.morning} weatherCode={weatherCodeDay?.morning} />
        <WeatherIndication morning={false} temp={tempDay?.afternoon} weatherCode={weatherCodeDay?.afternoon} />
      </div>

      <div className="moonBloc">
          <MoonIndications date={currentDate} latitude={latitude} longitude={longitude} />
      </div>

      <div className="footer">
        <ChartTemp label={data?.hourly?.time?.slice(morningRange.start, afternoonRange.end)} temperature={tempInRangeDay} />
        <DayVisibility codesInDay={codeInRangeDay} tempsInDay={tempInRangeDay} firstHour={morningRange.start} lastHour={afternoonRange.end} />
        {error && ( <ErrorBloc message={error} /> )}
      </div>

    </div>
  );
}

export default App;