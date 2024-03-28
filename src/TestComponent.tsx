import { useEffect, useState } from "react";
import NavBtn from "./components/NavBtn/NavBtn";
import NavBigBtn from "./components/NavBigBtn/NavBigBtn";
import MenuNavBar from "./components/MenuNavBar/MenuNavBar";
import { useDispatch, useSelector } from "react-redux";
import { ILocation, setTemperature, weatherService } from "./redux/WeatherReducer";
import useGetWeather from "./utils/useGetWeather";
import DayTemperatures from "./components/DayTemperatures/DayTemperatures";
import IconWeather from "./components/IconWeather/IconWeather";
import DisplayTemp from "./components/DisplayTemp/DisplayTemp";


const Latitude = 43.60
const Longitude = 1.43333

const morningRange = { start: 8, end: 12 }
const afternoonRange = { start: 13, end: 20 }

function TestComponent() {
    const dispatch = useDispatch()
    const [location, setlocation] = useState<ILocation>({ latitude: Latitude, longitude: Longitude, label: 'Toulouse' })
    const [active, setActive] = useState<boolean>(false)
    const _weatherService = useSelector(weatherService)
    const [currentDate, loading, data, tempDay, weatherCodeDay, tempInRangeDay, codeInRangeDay, translateCodeInRangeDay, error] = useGetWeather(_weatherService.tomorrow, location);

    useEffect(() => {
        if(tempDay){
            dispatch(setTemperature(tempDay.day))
        }
    }, [tempDay] )


    return (
        <div style={{ width: '100%'}}>
            <MenuNavBar />

            <DisplayTemp temperature={parseInt(_weatherService.temperature)} city={_weatherService.city} />
            <DayTemperatures label={data?.hourly?.time?.slice(morningRange.start, afternoonRange.end)} temperature={tempInRangeDay} translateCodeInRangeDay={translateCodeInRangeDay} />
        </div>
    )
}

export default TestComponent;