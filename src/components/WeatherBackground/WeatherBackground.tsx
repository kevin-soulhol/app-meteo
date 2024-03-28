import './weatherBackground.scss';

import bgSun from '../../assets/bg_sun.jpg'
import bgWind from '../../assets/bg_wind.jpg'
import bgSnow from '../../assets/bg_neige.jpg'
import bgCloudy from '../../assets/bg_cloudy.jpg'
import bgRain from '../../assets/bg_rain.jpg'
import bgRainMix from '../../assets/bg_rainmix.jpg'
import bgThunderStorm from '../../assets/bg_thunderstorm.jpg'
import { AllowedWeather } from '../../utils/useGetWeather';

function WeatherBackground( { weather } : { weather : AllowedWeather }) {

    function getImage (_weather : AllowedWeather) {
        return {
            'sun': bgSun,
            'wind': bgWind,
            'snow': bgSnow,
            'cloudy': bgCloudy,
            'fog': bgCloudy,
            'hail': bgCloudy,
            'haze': bgCloudy,
            'rain': bgRain,
            'rainMix': bgRainMix,
            'showers': bgRain,
            'sleet': bgCloudy,
            'stormShowers': bgCloudy,
            'thunderstorm': bgThunderStorm,
        }[_weather]
    }

    return (
        <div className="weather-background" style={{ backgroundImage: `url(${getImage(weather)})`}}>
            <div className="opacity"></div>
        </div>
    )
}

export default WeatherBackground;