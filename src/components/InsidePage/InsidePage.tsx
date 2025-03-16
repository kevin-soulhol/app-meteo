import { useDispatch, useSelector } from "react-redux"
import { ISanitizedData } from "../../utils/useGetWeather"
import { setLocation, toggleSearchbarVisible, weatherService } from "../../redux/WeatherReducer"
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
    open: { scale: 1, borderRadius: "0px"},
    closed: { scale: 0, borderRadius: "100%", innerHeight: "100vw", x : -200, y : 1000},
  }

function InsidePage({ data, tomorrow } : { data : ISanitizedData, tomorrow : boolean}) {
    const _weatherService = useSelector(weatherService)
    const dispatch = useDispatch()

    const _onSelect = (selected : any) => {
        const coord = selected.geometry.coordinates
        dispatch(setLocation({latitude: coord[1], longitude: coord[0], city : selected.properties.label}))
        dispatch(toggleSearchbarVisible())
    }
    

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
                        <SearchBarPosition onSelect={_onSelect}/>

                </motion.div>

                <div className="page page-home">
                    <div className="layout">

                        <DisplayTemp temperature={data.temperatureDay} city={_weatherService.location?.city || ''} tomorrow={tomorrow} />

                        <div className="right-informations">
                            <IconWeather icon={data.weatherStringDay} />
                            
                            <MoonPhase latitude={data.latitude} longitude={data.longitude} tomorrow={tomorrow} />
                        </div>

                        <AnimatePresence>
                            {_weatherService.detailsVisible && (
                                <motion.div 
                                className="day-details-container"
                                initial={{ x: '-150%' }} 
                                animate={{ x: '0%' }} 
                                exit={{ x: '-150%' }} 
                                >
                                    <DayDetails humidityPercent={data.humidityDay} wind={data.windDay} precipitation={data.precipitationDay
                                    } sunset={data.sunset} sunrise={data.sunrise} />
                                </motion.div>
                            )}
                        </AnimatePresence>


                        <AnimatePresence>
                            {_weatherService.weekVisible && (
                                <motion.div 
                                className="week-temperatures-container"
                                initial={{ x: '-150%' }} 
                                animate={{ x: '0%' }} 
                                exit={{ x: '150%' }} 
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
                                    initial={{ x: '-150%' }} 
                                    animate={{ x: '0%' }} 
                                    exit={{ x: '200%' }} 
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