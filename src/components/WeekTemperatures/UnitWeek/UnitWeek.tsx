import { AllowedWeather } from '../../../utils/useGetWeather'
import IconWeather from '../../IconWeather/IconWeather'
import './unitWeek.scss'

function UnitWeek( { temperature, icon, label } : { temperature : number, icon : AllowedWeather, label : string } ) {

    return (
        <div className="unit-week">
            <div className="container-date">{label}</div>
            <div className="container-icon">
                <IconWeather icon={icon} size={`30`} />
            </div>
            <div className="container-temp">{temperature}°</div>
        </div>
    )
}

export default UnitWeek