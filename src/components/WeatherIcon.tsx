import { faCloud, faSun, faBolt, faWind, faSmog, faCloudBolt, faCloudSunRain, faCloudRain, faCloudSun, faCloudShowersWater, faSnowflake, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


interface ICorrespondance {
    [key: number]: IconProp;
}

function WeatherIcon({code} : { code : number }) {  

    let correspondance : ICorrespondance = {
        0 : faMoon,
        1 : faSun,
        2 : faCloudSun,
        3 : faCloudSun,
        4 : faCloud, 
        5: faCloudRain,
        6 : faSnowflake,
        8 : faCloudSunRain,
        9 : faSnowflake,
        10 : faSnowflake,
        11 : faSmog,
        12 : faSmog,
        13 : faCloudShowersWater,
        14 : faCloudBolt,
        15 : faCloudRain,
        16 : faMoon
    }

    /*
    const icon : IconProp = () => {
        if(code < 15){
            return correspondance[code]
        } else if (code < 30){
            //precipitation, fog, ice
            return faSnowflake
        } else if (code < 40){
            //sandstorm
            return faMoon 
        } else if (code < 50){
            //Fog or ice fog
            return faSmog 
        } else if (code < 60){
            //Drizzle 
            return faSmog 
        } else if (code < 70){
            //Rain 
            return faCloudRain 
        } else if (code < 80){
            //Snow 
            return faSnowflake 
        } else {
            return faMoon 
        }
    }
    */


  return (
    <div className="containIcon">
        <FontAwesomeIcon icon={correspondance[code]} size='4x' />
    </div>
  );
}

export default WeatherIcon;