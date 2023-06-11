import WeatherIcon from './WeatherIcon';




function WeatherIndication({ weatherCode, temp, morning }: { weatherCode: number | undefined, temp: string | undefined, morning: boolean }) {


  return (
    <div className="WeatherIndications">
      <div className="titre">{morning ? 'Matin' : 'Aprem'}</div>
      <div className="contain-temps">
        {temp}°
      </div>
      <WeatherIcon code={weatherCode ?? 0} />
    </div>
  );
}

export default WeatherIndication;