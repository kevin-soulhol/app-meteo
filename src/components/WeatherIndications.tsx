import WeatherIcon from './WeatherIcon';




function WeatherIndication({weatherCode, temp, morning} : { weatherCode : number | undefined, temp : string | undefined, morning : boolean }) {  


  return (
    <div className="WeatherIndications">
        <div className="titre">{ morning ? 'Matin' : 'Aprem'}</div>
        <WeatherIcon code={weatherCode ?? 0} />
        <div className="contain-temps">
            {temp}
        </div>
    </div>
  );
}

export default WeatherIndication;