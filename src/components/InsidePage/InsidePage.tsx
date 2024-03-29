import { useSelector } from "react-redux"
import { ISanitizedData } from "../../utils/useGetWeather"
import { weatherService } from "../../redux/WeatherReducer"
import WeatherBackground from "../WeatherBackground/WeatherBackground"
import DisplayTemp from "../DisplayTemp/DisplayTemp"
import IconWeather from "../IconWeather/IconWeather"
import MoonPhase from "../MoonPhase/MoonPhase"
import { AnimatePresence, motion } from "framer-motion"
import DayDetails from "../DayDetails/DayDetails"
import WeekTemperatures from "../WeekTemperatures/WeekTemperatures"
import DayTemperatures from "../DayTemperatures/DayTemperatures"
import MenuNavBar from "../MenuNavBar/MenuNavBar"
import SearchBarPosition from "../SearchBarPosition/SearchBarPosition"



const variantsContainerSearchbar = {
    open: { scale: 1 },
    closed: { scale: 0 },
  }

function InsidePage({ data, tomorrow } : { data : ISanitizedData, tomorrow : boolean}) {
    const _weatherService = useSelector(weatherService)
    

    return (
        <>
        {data && (
            <>
                <WeatherBackground weather={data.weatherStringDay} />

                <motion.div
                 className="container-searchbar"
                    animate={_weatherService.searchbarVisible ? "open" : "closed"}
                    variants={variantsContainerSearchbar}
                >
                    <div className="bg">
                        <SearchBarPosition onSelect={ (selected : any) => { console.log(selected)}}/>
                    </div>

                </motion.div>

                <div className="page page-home">
                    <div className="layout">

                        <DisplayTemp temperature={data.temperatureDay} city={'CACA'} tomorrow={tomorrow} />

                        <div className="right-informations">
                            <IconWeather icon={data.weatherStringDay} />
                            
                            <MoonPhase latitude={data.latitude} longitude={data.longitude} tomorrow={tomorrow} />
                        </div>

                        <AnimatePresence>
                            {_weatherService.detailsVisible && (
                                <motion.div 
                                className="day-details-container"
                                initial={{ x: -300 }} 
                                animate={{ x: 0 }} 
                                exit={{ x: -300 }} 
                                >
                                    <DayDetails humidityPercent={data.humidityDay} wind={data.windDay} precipitation={data.precipitationDay
                                    } sunset={new Date(data.sunset)} sunrise={new Date(data.sunrise)} />
                                </motion.div>
                            )}
                        </AnimatePresence>


                        <AnimatePresence>
                            {_weatherService.weekVisible && (
                                <motion.div 
                                className="week-temperatures-container"
                                initial={{ x: -1000 }} 
                                animate={{ x: 0 }} 
                                exit={{ x: 1000 }} 
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                }}>
                                    <WeekTemperatures rangeTemperature={data.rangeWeekTemperature} rangeTranslateWeatherCode={data.rangeWeekTranslateWeatherCode
                                    } rangeLabel={data.rangeWeekDay} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {!_weatherService.weekVisible && (
                                    <motion.div 
                                    className="day-temperatures-container"
                                    initial={{ x: -1000 }} 
                                    animate={{ x: 0 }} 
                                    exit={{ x: 1000 }} 
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                    }}>
                                        <DayTemperatures labels={data.rangeHoursLabel} temperature={data.tempInRangeDay} translateCodeInRangeDay={data.translateCodeInRangeDay} />
                                    </motion.div>
                                )}
                        </AnimatePresence>
                        
                        <MenuNavBar />
                    </div>
                </div>
            </>
            )}
        </>
    )
}

export default InsidePage