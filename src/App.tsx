import { useEffect, useState } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const morningRange = { start: 8, end: 12 }
const afternoonRange = { start: 13, end: 20 }

const Latitude = 43.60
const Longitude = 1.43333

function App() {
  const [location, setlocation] = useState<ILocation>({ latitude: Latitude, longitude: Longitude, label: 'Toulouse' })
  const [tomorrow, setTomorrow] = useState<boolean>(false)
  const [displaySearchBar, setDisplaySearchBar] = useState<boolean>(false)
  const [currentDate, loading, data, tempDay, weatherCodeDay, tempInRangeDay, codeInRangeDay, error] = useGetWeather(tomorrow, location);
  

  const changeAddress = (item: IDataLocationApiAddress) => {
    if (item) {
      setlocation({
        latitude: item.geometry.coordinates[0],
        longitude: item.geometry.coordinates[1],
        label: item.properties.city
      })
    }
    setDisplaySearchBar(false)
  }

  const _onKeyPress = (evt: KeyboardEvent) => {
    switch (evt.code) {

      case 'KeyF':
        if (!displaySearchBar) {
          setDisplaySearchBar(true)
        }
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', e => {
      _onKeyPress(e)
    });
  }, []);

  return (
    <div className="App">
      <header>
        <div className="date" onClick={() => setDisplaySearchBar(true)}>
          {new Intl.DateTimeFormat('fr-FR', { weekday: "long", month: "long", day: "numeric" }).format(currentDate)} - {location.label}
          <FontAwesomeIcon icon={faSearch} />
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
        {error && (<ErrorBloc message={error} />)}
      </div>

      {displaySearchBar && (
        <SearchbarLocation onSelect={(item: IDataLocationApiAddress) => changeAddress(item)} />
      )}
    </div>
  );
}

export default App;