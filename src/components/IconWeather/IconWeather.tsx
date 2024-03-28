import './iconWeather.scss'
import { ReactComponent as IconSun } from '../../assets/Sunicon-weather.svg';
import { ReactComponent as IconCloudy } from '../../assets/Cloudy-icon-weather.svg';
import { ReactComponent as IconFog } from '../../assets/Fog-icon-weather.svg';
import { ReactComponent as IconHaze } from '../../assets/Haze-icon-weather.svg';
import { ReactComponent as IconRain } from '../../assets/Rain-icon-weather.svg';
import { ReactComponent as IconRainMix } from '../../assets/RainMix-icon-weather.svg';
import { ReactComponent as IconSnow } from '../../assets/Snow-icon-weather.svg';
import { ReactComponent as IconWind } from '../../assets/Wind-icon-weather.svg';
import { ReactComponent as IconStormshower } from '../../assets/Stormshower-icon-weather.svg';
import { ReactComponent as IconThunderstorm } from '../../assets/Thunderstorm-icon-weather.svg';
import { ReactComponent as IconHail } from '../../assets/Hail-icon-weather.svg';
import { AllowedWeather } from '../../utils/useGetWeather';

function IconWeather({ icon, size } : { icon: AllowedWeather, size?: string | number}) {

    function getIcon() {
        if(icon){
            return {
                sun: <IconSun />,
                cloudy: <IconCloudy />,
                fog: <IconFog />,
                haze: <IconHaze />,
                rain: <IconRain />,
                snow: <IconSnow />,
                wind: <IconWind />,
                showers: <IconRain />,
                stormShowers: <IconStormshower />,
                thunderstorm: <IconThunderstorm />,
                sleet: <IconCloudy />,
                rainMix: <IconRainMix />,
                hail: <IconHail />,
            }[icon]
        }
    }

    const style = {
        width: size && !Number.isInteger(size) ? `${size}px` : '',
        height: size && !Number.isInteger(size) ? `${size}px` : '',
        flex : size && Number.isInteger(size) ? '1' : ''
    }

    return (
        <div className="icon-weather" style={style}>
            { getIcon() }
        </div>
    )
}

export default IconWeather;