import { useEffect, useState } from 'react';
import WeatherIndication from './components/WeatherIndications';
import ChartTemp from './components/ChartTemp';
import WeatherIcon from './components/WeatherIcon';
import ToggleButton from './components/ToogleButton';
import MoonIndications from './components/MoonIndications';
import DayVisibility from './components/DayVisibility';
import useGetWeather from './utils/useGetWeather';
import ErrorBloc from './components/ErrorBloc';

import IWeatherDay from './types/WeatherDay';
import IWeatherCodeDay from './types/WeatherCodeDay';
import ILocation from './types/Location';
import SearchbarLocation from './components/SearchbarLocation';
import IDataLocationApiAddress from './types/DataLocationApiAddress';

const morningRange = { start : 8, end : 12 }
const afternoonRange = { start : 13, end : 20 }

const Latitude = 43.60
const Longitude = 1.43333

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
  const [location, setlocation] = useState<ILocation>({ latitude : Latitude, longitude : Longitude, label : 'Toulouse' })
  
  const [tomorrow, setTomorrow] = useState<boolean>(false)
  const [displaySearchBar, setDisplaySearchBar] = useState<boolean>(false)
  const [currentDate, loading, data, error] = useGetWeather(tomorrow, location);


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

  const changeAddress = (item : IDataLocationApiAddress) => {
    console.log(item)
    setlocation({
      latitude :  item.geometry.coordinates[0],
      longitude :  item.geometry.coordinates[1], 
      label : item.properties.city
    })
    setDisplaySearchBar(false)
  }

  return (
    <div className="App">
      <header>
        <div className="date" onClick={() => setDisplaySearchBar(true)}>
          {new Intl.DateTimeFormat('fr-FR', { weekday: "long", month: "long", day: "numeric" }).format(currentDate)} - { location.label }
        </div>
        <ToggleButton selected={tomorrow ? 2 : 1} onClick={() => setTomorrow(!tomorrow)} />
      </header>

      <div className="centerElements">
        <div className="mainIcon"><WeatherIcon code={weatherCodeDay?.day ?? 0} /></div>
        <div className="currentTemp">{tempDay?.day}°</div>
      
        <WeatherIndication morning={true} temp={tempDay?.morning} weatherCode={weatherCodeDay?.morning} />
        <WeatherIndication morning={false} temp={tempDay?.afternoon} weatherCode={weatherCodeDay?.afternoon} />
      </div>

      <div className="moonBloc">
          <MoonIndications date={currentDate} latitude={location.latitude} longitude={location.longitude} />
      </div>

      <div className="footer">
        <ChartTemp label={data?.hourly?.time?.slice(morningRange.start, afternoonRange.end)} temperature={tempInRangeDay} />
        <DayVisibility codesInDay={codeInRangeDay} tempsInDay={tempInRangeDay} firstHour={morningRange.start} lastHour={afternoonRange.end} />
        {error && ( <ErrorBloc message={error} /> )}
      </div>

      {displaySearchBar && (
        <SearchbarLocation onSelect={(item : IDataLocationApiAddress ) => changeAddress(item) } />
      )}
    </div>
  );
}

export default App;