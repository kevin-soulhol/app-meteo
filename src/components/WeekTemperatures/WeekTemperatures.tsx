import { AllowedWeather } from '../../utils/useGetWeather';
import { motion } from "framer-motion";
import UnitWeek from './UnitWeek/UnitWeek';
import './weekTemperatures.scss';
import { createRef, useEffect } from 'react';

function WeekTemperatures( { rangeTemperature, rangeTranslateWeatherCode, rangeLabel } : { rangeTemperature : number[], rangeTranslateWeatherCode : AllowedWeather[], rangeLabel : string[]}) {

    const ref = createRef<HTMLDivElement>()

    function getDate (date : string) {
        const d = new Date(date)
        return new Intl.DateTimeFormat('fr-FR', {
            weekday: "short",
            day: "numeric"
        }).format(d)
    }

    return (
        <div className="week-temperatures">
            <motion.div className="draggable"
                drag="x"
                dragConstraints={{ left: (window.innerWidth - 50) - (ref.current?.offsetWidth || 520), right: 0 }}
            >
                {rangeTemperature?.map((dayTemp, index) => (
                    <UnitWeek temperature={dayTemp} icon={rangeTranslateWeatherCode[index]} label={getDate(rangeLabel[index])} key={index} />
                ))}

            </motion.div>
        </div>
    )

}

export default WeekTemperatures;