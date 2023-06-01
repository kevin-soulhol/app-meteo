import { useEffect, useState } from 'react';

interface IinCorrespondance {
    [key: string]: string;
}
interface ICorrespondance {
    [key: number]: IinCorrespondance;
}

function WeatherIcon({code} : { code : number }) {  

    const [icon, setIcon] = useState<string | undefined>()

    const correspondance : ICorrespondance = {
        0 :  //Haze, dust, sand or smoke
        {
            low : 'day-sunny',
            medium : 'day-cloudy',
            hard : 'day-cloudy',
        },
        1 : 
        {
            low : 'day-light-wind',
            medium : 'day-haze',
            hard : 'fog'
        },
        2 :  //Precipitation, fog, ice fog or thunderstorm at the station during the preceding hour but not at the time of observation 
        {
            low : 'day-rain',
            medium : 'day-hail',
            hard : 'rain',
            thunder : 'thunderstorm'
        },
        3 : //Duststorm, sandstorm, drifting or blowing snow 
        {
            low : 'day-light-wind',
            medium : 'day-light-wind',
            hard : 'day-light-wind'
        },
        4 : //Fog or ice fog at the time of observation 
        {
            low : 'fog',
            medium : 'fog',
            hard : 'fog',
        },
        5 : //Drizzle
        {
            low : 'sleet',
            medium : 'sleet',
            hard : 'sleet',
        },
        6 : //Rain
        {
            low : 'rain',
            medium : 'rain',
            hard : 'rain',
        },
        7 : //Solid precipitation not in showers 
        {
            low : 'rain-mix',
            medium : 'rain-mix',
            hard : 'rain-mix',
        },
        8 :  //Showery precipitation, or precipitation with current or recent thunder storm 
        {
            low : 'showers',
            medium : 'snow',
            hard : 'storm-showers',
        },
        9 :  //Showery precipitation, or precipitation with current or recent thunder storm 
        {
            low : 'storm-showers',
            medium : 'storm-showers',
            hard : 'thunderstorm',
        },
    }

    useEffect(() => {
        _parseIcon()
    }, [code])

    const _parseIcon : any = () => {
        console.log(code)
        let cpCode = `${code}`
        if(code < 10){
            cpCode = `0${code}`
        }
        let arrCode = `${cpCode}`.split('')

        let firstCode = parseInt(arrCode[0])
        let secondCode = parseInt(arrCode[1])
        let force = null
        if(secondCode <= 2){
            force = 'low'
        } else if(secondCode < 7){
            force = 'medium'
        } else {
            force = 'hard'
        }

        setIcon(`wi wi-${correspondance[firstCode][force]}`)
    }


  return (
    <div className="weatherIcon">
        <i className={icon}></i>
        { (code >= 10) && (
            <div className="backgroundColor"></div>
        )}
    </div>
  );
}

export default WeatherIcon;